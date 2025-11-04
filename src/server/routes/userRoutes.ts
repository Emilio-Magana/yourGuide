import express from "express";
import reviewRouter from "./reviewRoutes";
import bookingRouter from "./bookingRoutes";
import {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  getMe,
  uploadUserPhoto,
  resizeUserPhoto,
  getUserBookings,
  getUserReviews,
} from "./../controllers/userController";
import {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
  restrictTo,
  logout,
} from "./../controllers/authController";

const router = express.Router();

// taking example from how reviewRouter was merged with tours in ./tourRoutes
router.use("/:userId/reviews", reviewRouter);
router.use("/:userId/bookings", bookingRouter);

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);

// Protect all routes after this middleware
router.use(protect);
router.get("/me", getMe, getUser);
router.patch("/updateMyPassword", updatePassword);
router.patch("/updateMe", uploadUserPhoto, resizeUserPhoto, updateMe);
router.delete("/deleteMe", deleteMe);

router.use(restrictTo("admin"));
router.route("/").get(getAllUsers).post(createUser);
router
  .route("/:userId")
  .get(getUser, getUserBookings, getUserReviews)
  .patch(updateUser)
  .delete(deleteUser);

export default router;
