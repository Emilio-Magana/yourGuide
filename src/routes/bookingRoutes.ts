const express = require("express");
const {
  getCheckoutSession,
  getAllBookings,
  createBooking,
  getBooking,
  updateBooking,
  deleteBooking,
} = require("./../controllers/bookingController");
const { protect, restrictTo } = require("./../controllers/authController");

const router = express.Router();

router.use(protect);

router.use(restrictTo("admin", "lead-guide"));
router.route("/").get(getAllBookings).post(createBooking);
router.get("/checkout-session/:tourId", getCheckoutSession);
router.route("/:id").get(getBooking).patch(updateBooking).delete(deleteBooking);

module.exports = router;
