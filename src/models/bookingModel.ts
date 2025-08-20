import { Schema, model, Document } from "mongoose";
import { IUser } from "./userModel";
import { ITour } from "./tourModel";

/**
 * Type to model the Booking Schema for Typescript
 * TBooking
 * @param tour:ref => Tour._id
 * @param user:ref => User._id
 * @param price:Number
 * @param paid:Boolean
 * @param createdAt: Date;
 */

export type TBooking = {
  tour: ITour["_id"];
  user: IUser["_id"];
  price: number;
  paid: boolean;
  createdAt: Date;
};

export interface IBooking extends TBooking, Document {}

const bookingSchema: Schema = new Schema({
  tour: {
    type: Schema.Types.ObjectId,
    ref: "Tour",
    required: [true, "Booking must belong to a Tour!"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Booking must belong to a User!"],
  },
  price: {
    type: Number,
    require: [true, "Booking must have a price."],
  },
  paid: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

bookingSchema.pre(/^find/, function (next) {
  this.populate("user").populate({
    path: "tour",
    select: "name",
  });
  next();
});

const Booking = model<IBooking>("Booking", bookingSchema);
export default Booking;
