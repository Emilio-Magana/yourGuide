import type { Stripe } from "stripe";
import type { Response, NextFunction, Request } from "express";
import User from "./../models/userModel";
import Tour from "./../models/tourModel";
import { stripe } from "./../lib/stripe";
import AppError from "./../utils/appError";
import Booking from "./../models/bookingModel";
import { catchAsync } from "./../utils/catchAsync";
import {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} from "./handlerFactory";
import type { UserRequest } from "./../common/interfaces/mainInterfaces";

const getCheckoutSession = catchAsync(
  async (req: UserRequest, res: Response, next: NextFunction) => {
    // 1) Get the currently booked tour
    const tour = await Tour.findById(req.params.tourId);
    // console.log(tour);
    if (!tour) {
      return next(new AppError("No tour found with that ID", 404));
    }
    const participants = parseInt(req.query.participants as string) || 1;
    const date = req.query.date as string;

    // 2) Create checkout session
    const checkoutSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        success_url: `${req.protocol}://${req.get("host")}/my-tours?alert=booking`,
        cancel_url: `${req.protocol}://${req.get("host")}/tour/${tour.slug}`,
        customer_email: req.user!.email,
        client_reference_id: req.params.tourId,
        metadata: {
          participants: participants.toString(),
          bookingDate: date || "",
        },
        line_items: [
          {
            quantity: participants,
            price_data: {
              currency: "usd",
              unit_amount: tour.price * 100, // amount in cents
              product_data: {
                name: `${tour.name} Tour`,
                description: tour.summary,
                images: [
                  `${req.protocol}://${req.get("host")}/img/tours/${tour.imageCover}`,
                ],
              },
            },
          },
        ],
      });

    // 3) Create session as response
    res.status(200).json({
      status: "success",
      checkoutSession,
    });
  },
);

const createBookingCheckout = async (session: Stripe.Checkout.Session) => {
  if (!session.amount_total) {
    throw new AppError("Total amount is missing in the session", 400);
  }
  const tour = session.client_reference_id;
  // const user = (await User.findOne({ email: session.customer_email }))?._id;
  const user = await User.findOne({ email: session.customer_email });

  if (!user) {
    throw new AppError(
      `User with email ${session.customer_email} not found`,
      400,
    );
  }

  const userId = user._id;
  const price = session.amount_total / 100;

  const participants = parseInt(session.metadata?.participants || "1");
  const bookingDate = session.metadata?.bookingDate;

  await Booking.create({
    tour,
    user: userId,
    price,
    participants,
    startDate: bookingDate,
  });
};

const webhookCheckout = catchAsync(
  (req: Request, res: Response, next: NextFunction) => {
    const signature = req.headers["stripe-signature"];

    if (!signature) {
      throw new AppError("Stripe signature could not be found", 401);
    }

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (err: any) {
      return res.status(400).send(`Webhook error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed")
      createBookingCheckout(event.data.object);

    res.status(200).json({ received: true });
  },
);

const createBooking = createOne(Booking);
const updateBooking = updateOne(Booking);
const deleteBooking = deleteOne(Booking);
const getAllBookings = getAll(Booking);
const getBooking = getOne(Booking);

export {
  getCheckoutSession,
  webhookCheckout,
  getAllBookings,
  createBooking,
  updateBooking,
  deleteBooking,
  getBooking,
};
