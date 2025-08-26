import { Schema, Document, model, Query, Model } from "mongoose";
import Tour, { type ITour } from "./tourModel";
import { type IUser } from "./userModel";

/**
 * Type to model the Booking Schema for Typescript
 * TBooking
 * @param review:number
 * @param rating:string
 * @param createdAt: Date;
 * @param tour:ref => Tour._id
 * @param user:ref => User._id
 */

export type TReview = {
  review: string;
  rating: number;
  createdAt: Date;
  tour: ITour;
  user: IUser;
};

export interface IReview extends TReview, Document {}

export interface ReviewModel extends Model<IReview> {
  calcAverageRatings(tourId: string | Schema.Types.ObjectId): Promise<void>;
}

const reviewSchema = new Schema(
  {
    review: {
      type: String,
      required: [true, "Review can not be empty!"],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    tour: {
      type: Schema.Types.ObjectId,
      ref: "Tour",
      required: [true, "Review must belong to a tour."],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Review must belong to a user"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

reviewSchema.pre<Query<IReview[], IReview>>(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name photo",
  });
  next();
});

reviewSchema.statics.calcAverageRatings = async function (tourId: string) {
  const stats = await this.aggregate([
    {
      $match: { tour: tourId },
    },
    {
      $group: {
        _id: "$tour",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);
  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};

reviewSchema.post<IReview>("save", function () {
  (this.constructor as ReviewModel).calcAverageRatings(this.tour.toString());
});

reviewSchema.pre<Query<IReview, IReview>>(/^findOneAnd/, async function (next) {
  const query = this as Query<IReview, IReview> & { r?: IReview | null };
  query.r = await query.findOne();
  next();
});

reviewSchema.post<Query<IReview, IReview>>(/^findOneAnd/, async function () {
  const query = this as Query<IReview, IReview> & { r?: IReview | null };
  if (query.r) {
    await (query.r.constructor as ReviewModel).calcAverageRatings(
      query.r.tour.toString()
    );
  }
});

const Review = model<IReview, ReviewModel>("Review", reviewSchema);
export default Review;
