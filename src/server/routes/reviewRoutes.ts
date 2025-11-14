import express from "express";
import {
  getAllReviews,
  createReview,
  deleteReview,
  updateReview,
  setTourUserIds,
  getReview,
  getAllUserReviews,
} from "./../controllers/reviewController";
import { protect, restrictTo } from "./../controllers/authController";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(getAllReviews, restrictTo("admin"), getAllUserReviews)
  .post(protect, restrictTo("user"), setTourUserIds, createReview);

router.use(protect);

router
  .route("/:id")
  .get(getReview)
  .patch(restrictTo("user", "admin"), updateReview)
  .delete(restrictTo("user", "admin"), deleteReview);

export default router;
