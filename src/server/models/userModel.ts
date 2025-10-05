import { Schema, model, Document, Query } from "mongoose";
import validator from "validator";
import crypto from "crypto";
import bcrypt from "bcrypt";

/**
 * Type to model the Booking Schema for Typescript
 * TUser
 * @param name:string
 * @param email:string
 * @param password:string | undefined
 * @param photo:string
 * @param role:"user" | "admin" | "guide" | "lead-guide";
 * @param passwordConfirm:string;
 * @param passwordChangedat:Date;
 * @param passwordResetToken:string;
 * @param passwordResetExpires:Date;
 * @param active:boolean;
 */

export type TUser = {
  name: string;
  email: string;
  password: string;
  photo: string;
  role: "user" | "admin" | "guide" | "lead-guide";
  passwordConfirm: string;
  passwordChangedat: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  active: boolean;
};

export interface IUser extends TUser, Document {
  correctPassword(
    candidatePassword: string,
    userPassword: string,
  ): Promise<boolean>;
  changedPasswordAfter(JWTTimestamp: number): boolean;
  createPasswordResetToken(): string;
}

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "user must have a name"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "user must have an email!"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "user must have a password"],
    minlength: 8,
    select: false,
  },
  photo: { type: String },
  role: {
    type: String,
    enum: ["user", "admin", "guide", "lead-guide"],
    default: "user",
  },
  passwordConfirm: {
    type: String,
    required: [true, "You must confirm your password"],
    validate: {
      validator: function (this: IUser, val: string) {
        return val === this.password;
      },
      message: "The passwords must match",
    },
    default: undefined,
  },
  passwordChangedat: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: { type: Boolean, default: true, select: false },
});

userSchema.pre<IUser>("save", async function (next) {
  //if password not modified we don't have to hash it
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.set({ passwordConfirm: undefined }, undefined, { strict: false });
  next();
});
userSchema.pre<IUser>("save", function (next) {
  if (!this.isModified("password") || this.isNew) {
    return next();
  }

  this.passwordChangedat = new Date(Date.now() - 1000);
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
userSchema.methods.changedPasswordAfter = function (
  JWTTimestamp: number,
): boolean {
  if (this.passwordChangedat) {
    // console.log(this.passwordChangedat);
    const changedTimestamp = Math.floor(
      this.passwordChangedat.getTime() / 1000,
    );
    return JWTTimestamp < changedTimestamp;
  }

  //   False means not changed
  return false;
};
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
userSchema.pre<Query<IUser[], IUser>>(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

const User = model<IUser>("User", userSchema);
export default User;
