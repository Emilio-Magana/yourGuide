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

const router = express.Router({ mergeParams: true });

router.use(protect);

router.route("/").get(getAllBookings).post(restrictTo("user"), createBooking);
router.use(restrictTo("admin", "lead-guide"));
router.get("/checkout/:tourId", getCheckoutSession);
router.route("/:id").get(getBooking).patch(updateBooking).delete(deleteBooking);

export default router;
