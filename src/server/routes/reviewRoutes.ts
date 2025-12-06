import express from "express";
import {
  getAllReviews,
  createReview,
  deleteReview,
  updateReview,
  setTourUserIds,
  getReview,
} from "./../controllers/reviewController";
import { protect, restrictTo } from "./../controllers/authController";
import { uploadTourReviewImages } from "../controllers/tourController";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(getAllReviews)
  .post(
    protect,
    restrictTo("user"),
    uploadTourReviewImages,
    setTourUserIds,
    createReview,
  );

router.use(protect);

router
  .route("/:id")
  .get(getReview)
  .patch(restrictTo("user", "admin"), updateReview)
  .delete(restrictTo("user", "admin"), deleteReview);

export default router;
