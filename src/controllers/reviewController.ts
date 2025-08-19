import Review from "@/models/reviewModel";
import {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} from "./handlerFactory";
import { ExpressMiddleware } from "@/common/interfaces/mainInterfaces";

exports.setTourUserIds = ({ req, res, next }: ExpressMiddleware) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllReviews = getAll(Review);
exports.getReview = getOne(Review);
exports.createReview = createOne(Review);
exports.updateReview = updateOne(Review);
exports.deleteReview = deleteOne(Review);
