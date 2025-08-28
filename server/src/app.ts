import hpp from "hpp";
// import path from "path";
// import cors from "cors";
import express from "express";
// import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";

// import AppError from "./utils/appError";
import AppError from "./utils/appError";
import userRouter from "./routes/userRoutes";
import tourRouter from "./routes/tourRoutes";
import reviewRouter from "./routes/reviewRoutes";
// import bookingRouter from "./routes/bookingRoutes";
import errorHandler from "./controllers/errorController";
// import bookingController from "@/backend/controllers/bookingController";

// Start express app
const app = express();
// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// // Implement CORS, can not be used wiht localhost
// app.use(cors());
// app.options("*all", cors());

// // // Body parser, reading data from body into req.body
// app.use(express.json({ limit: "10kb" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

//TypeError: Cannot set property query of #<IncomingMessage> which has only a getter in place because of mangosanitize
app.use((req, res, next) => {
  Object.defineProperty(req, "query", {
    ...Object.getOwnPropertyDescriptor(req, "query"),
    value: req.query,
    writable: true,
  });
  next();
});

// // // Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsQuantity",
      "ratingsAverage",
      "maxGroupSize",
      "difficulty",
      "price",
    ],
  })
);
app.use(compression());

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// Body parser
app.use(express.json({ limit: "10kb" }));

// Cached production assets

// Stripe webhook, BEFORE body-parser, because stripe needs the body as stream
// app.post(
//   "/webhook-checkout",
//   bodyParser.raw({ type: "application/json" }),
//   bookingController.webhookCheckout,
// );

// Data sanitization against XSS
// app.use(xss());

// ROUTES
app.get("/", (req, res) => res.send("Server working!"));
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);
// app.use("/api/v1/bookings", bookingRouter);

app.all("*all", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

export default app;
