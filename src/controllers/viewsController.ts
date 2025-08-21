import AppError from "../utils/appError";
import Tour from "../models/tourModel";
import User, { IUser } from "../models/userModel";
import Booking from "../models/bookingModel";
import { catchAsync } from "../utils/catchAsync";
import { ExpressMiddleware } from "@/common/interfaces/mainInterfaces";

const alerts = ({ req, res, next }: ExpressMiddleware) => {
  const { alert } = req.query;
  if (alert === "booking")
    res.locals.alert =
      "Your booking was successful! Please check your email for a confirmation. If your booking doesn't show up here immediatly, please come back later.";
  next();
};

const getOverview = catchAsync(
  async ({ req, res, next }: ExpressMiddleware) => {
    // 1) Get tour data from collection
    const tours = await Tour.find();

    // 2) Build template
    // 3) Render that template using tour data from 1)
    res.status(200).render("overview", {
      title: "All Tours",
      tours,
    });
  },
);

const getTour = catchAsync(async ({ req, res, next }: ExpressMiddleware) => {
  // 1) Get the data, for the requested tour (including reviews and guides)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: "reviews",
    fields: "review rating user",
  });

  if (!tour) {
    return next(new AppError("There is no tour with that name.", 404));
  }

  // 2) Build template
  // 3) Render template using data from 1)
  res.status(200).render("tour", {
    title: `${tour.name} Tour`,
    tour,
  });
});

const getLoginForm = ({ req, res }: ExpressMiddleware) => {
  res.status(200).render("login", {
    title: "Log into your account",
  });
};

const getAccount = ({ req, res }: ExpressMiddleware) => {
  res.status(200).render("account", {
    title: "Your account",
  });
};

const getMyTours = catchAsync(async ({ req, res, next }: ExpressMiddleware) => {
  // 1) Find all bookings
  const bookings = await Booking.find({ user: req.user.id });

  // 2) Find tours with the returned IDs
  const tourIDs = bookings.map((el) => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIDs } });

  res.status(200).render("overview", {
    title: "My Tours",
    tours,
  });
});

const updateUserData = catchAsync(
  async ({ req, res, next }: ExpressMiddleware) => {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        name: req.body.name,
        email: req.body.email,
      },
      {
        new: true,
        runValidators: true,
      },
    );
    if (!updatedUser) {
      return next(new AppError("User not found", 404));
    }

    res.status(200).render("account", {
      title: "Your account",
      user: updatedUser,
    });
  },
);

export {
  alerts,
  getOverview,
  getTour,
  updateUserData,
  getMyTours,
  getAccount,
  getLoginForm,
};
