import express from "express";
import {
  getCheckoutSession,
  getAllBookings,
  createBooking,
  getBooking,
  updateBooking,
  deleteBooking,
} from "./../controllers/bookingController";
import { protect, restrictTo } from "./../controllers/authController";

const router = express.Router();

router.use(protect);

router.use(restrictTo("admin", "lead-guide"));
router.route("/").get(getAllBookings).post(createBooking);
router.get("/checkout-session/:tourId", getCheckoutSession);
router.route("/:id").get(getBooking).patch(updateBooking).delete(deleteBooking);

export default router;
