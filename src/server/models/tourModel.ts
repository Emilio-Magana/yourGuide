import { Schema, Document, model, Query } from "mongoose";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const slugify = require("slugify");
import { type IUser } from "./userModel";

/**
 * Type to model the Booking Schema for Typescript
 * TTour
 * @param name:string
 * @param slug:string
 * @param duration:number
 * @param maxGroupSize:number
 * @param difficulty:string;
 * @param ratingsAverage:number;
 * @param ratingsQuantity:number;
 * @param price:number;
 * @param priceDiscount:number;
 * @param summary:string;
 * @param description:string;
 * @param imageCover:string;
 * @param images:number[];
 * @param createdAt:Date;
 * @param startDates:Date[];
 * @param secretTour:boolean;
 * @param startLocation:{
    type: string;
    coordinates: number[];
    address: string;
    description: string;
  };
 * @param locations:Array<{
    type: string;
    coordinates: number[];
    address: string;
    description: string;
    day: number;
  }>;
 * @param guides:Array<IUser["_id"]>;
 */

export type TTour = {
  name: string;
  slug: string;
  duration: number;
  maxGroupSize: number;
  difficulty: "easy" | "medium" | "difficult";
  ratingsAverage: number;
  ratingsQuantity: number;
  price: number;
  priceDiscount: number;
  summary: string;
  description: string;
  imageCover: string;
  images: number[];
  createdAt: Date;
  startDates: Date[];
  secretTour: boolean;
  startLocation: {
    type: string;
    coordinates: number[];
    address: string;
    description: string;
  };
  locations: Array<{
    type: string;
    coordinates: number[];
    address: string;
    description: string;
    day: number;
  }>;
  guides: Array<IUser>;
};

export interface ITour extends TTour, Document {
  durationWeeks: number;
}

const tourSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "A tour must have a name"],
      unique: true,
      trim: true,
      maxlength: [40, "A tour name must have less or equal then 40 characters"],
      minlength: [10, "A tour name must have more or equal then 10 characters"],
      // validate: [validator.isAlpha, 'Tour name must only contain characters']
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, "A tour must have a duration"],
    },
    maxGroupSize: {
      type: Number,
      required: [true, "A tour must have a group size"],
    },
    difficulty: {
      type: String,
      required: [true, "A tour must have a difficulty"],
      enum: {
        values: ["easy", "medium", "difficult"],
        message: "Difficulty is either: easy, medium, difficult",
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
      set: (val: number) => Math.round(val * 10) / 10, // 4.666666, 46.6666, 47, 4.7
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "A tour must have a price"],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (this: ITour, val: number) {
          // this only points to current doc on NEW document creation
          return val < this.price;
        },
        message: "Discount price ({VALUE}) should be below regular price",
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, "A tour must have a description"],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, "A tour must have a cover image"],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
    startLocation: {
      // GeoJSON
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: "Point",
          enum: ["Point"],
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],
    guides: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// tourSchema.index({ price: 1 });
tourSchema.index({ price: 1, ratingsAverage: -1 });
tourSchema.index({ slug: 1 });
tourSchema.index({ startLocation: "2dsphere" });

tourSchema.virtual("durationWeeks").get(function (this: ITour) {
  return this.duration / 7;
});

// Virtual populate
tourSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "tour",
  localField: "_id",
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
tourSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// QUERY MIDDLEWARE
// tourSchema.pre('find', function(next) {
tourSchema.pre<Query<ITour[], ITour>>(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });

  // this.start = Date.now();
  next();
});

tourSchema.pre<Query<ITour[], ITour>>(/^find/, function (next) {
  this.populate({
    path: "guides",
    select: "-__v -passwordChangedAt",
  });

  next();
});

const Tour = model<ITour>("Tour", tourSchema);
export default Tour;
