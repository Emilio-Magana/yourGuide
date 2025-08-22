const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import Stripe from "stripe";
import { Response, NextFunction } from "express";
import User from "@/models/userModel";
import Tour from "@/models/tourModel";
import AppError from "@/utils/appError";
import Booking from "@/models/bookingModel";
import { catchAsync } from "@/utils/catchAsync";
import {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} from "./handlerFactory";
import {
  AuthenticatedRequest,
  ExpressMiddleware,
} from "@/common/interfaces/mainInterfaces";

const getCheckoutSession = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // 1) Get the currently booked tour
    const tour = await Tour.findById(req.params.tourId);
    // console.log(tour);
    if (!tour) {
      return next(new AppError("No tour found with that ID", 404));
    }

    // 2) Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: `${req.protocol}://${req.get("host")}/my-tours?alert=booking`,
      cancel_url: `${req.protocol}://${req.get("host")}/tour/${tour.slug}`,
      customer_email: req.user.email,
      client_reference_id: req.params.tourId,
      line_items: [
        {
          name: `${tour.name} Tour`,
          description: tour.summary,
          images: [
            `${req.protocol}://${req.get("host")}/img/tours/${tour.imageCover}`,
          ],
          amount: tour.price * 100,
          currency: "usd",
          quantity: 1,
        },
      ],
    });

    // 3) Create session as response
    res.status(200).json({
      status: "success",
      session,
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
  // const price = session.line_items[0].amount / 100;

  const price = session.amount_total / 100;
  await Booking.create({ tour, user: userId, price });
};

const webhookCheckout = ({ req, res, next }: ExpressMiddleware) => {
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
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed")
    createBookingCheckout(event.data.object);

  res.status(200).json({ received: true });
};

const createBooking = createOne(Booking);
const getBooking = getOne(Booking);
const getAllBookings = getAll(Booking);
const updateBooking = updateOne(Booking);
const deleteBooking = deleteOne(Booking);

export {
  getCheckoutSession,
  webhookCheckout,
  createBooking,
  getBooking,
  getAllBookings,
  updateBooking,
  deleteBooking,
};
