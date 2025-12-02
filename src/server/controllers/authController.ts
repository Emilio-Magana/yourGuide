import {
  type Request,
  type RequestHandler,
  type Response,
  type NextFunction,
} from "express";
import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken";
import crypto from "crypto";
// import Email from "@/backend/utils/email";
import AppError from "./../utils/appError";
import { catchAsync } from "./../utils/catchAsync";
import User, { type IUser } from "./../models/userModel";
import type { UserRequest } from "./../common/interfaces/mainInterfaces";

const signToken = (id: string) => {
  const options: SignOptions = {
    expiresIn: process.env.JWT_EXPIRES_IN, // ✅ string is allowed here
  };
  return jwt.sign({ id }, process.env.JWT_SECRET, options);
};
const createSendToken = (
  user: IUser,
  statusCode: number,
  req: Request,
  res: Response,
) => {
  const token = signToken(user._id as string);

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  // Remove password from output, this was the previous method used in js, doesnt work in ts
  // user.password = undefined;

  // Convert to plain object and remove password
  const safeUser = user.toObject();
  delete safeUser.password;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user: safeUser,
    },
  });
};
function verifyToken(token: string, secret: string): Promise<JwtPayload> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err || !decoded)
        return reject(new AppError("Invalid or expired token", 401));
      resolve(decoded as JwtPayload);
    });
  });
}
const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newUser: IUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    // const url = `${req.protocol}://${req.get("host")}/me`;
    // // console.log(url);
    // await new Email(newUser, url).sendWelcome();

    createSendToken(newUser, 201, req, res);
  },
);

const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("Please provide email and password!", 400));
    }

    const user: IUser = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError("Incorrect email or password", 401));
    }

    createSendToken(user, 200, req, res);
  },
);

// const logout = (req: Request, res: Response) => {
//   res.cookie("jwt", "loggedout", {
//     expires: new Date(Date.now() + 10 * 1000),
//     httpOnly: true,
//   });
//   res.status(200).json({ status: "success" });
// };
const logout = (req: Request, res: Response) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
  res.status(200).json({ status: "success" });
};

const protect = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token || token === "loggedout") {
      return next(
        new AppError(
          "You are not logged in! Please log in to get access.",
          401,
        ),
      );
    }

    let decoded;
    try {
      decoded = await verifyToken(token, process.env.JWT_SECRET!);
    } catch (error) {
      return next(
        new AppError("Invalid or expired token. Please log in again.", 401),
      );
    }

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError(
          "The user belonging to this token does no longer exist.",
          401,
        ),
      );
    }
    if (currentUser.changedPasswordAfter(decoded.iat as number)) {
      return next(
        new AppError(
          "User recently changed password! Please log in again.",
          401,
        ),
      );
    }
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
  } catch (error) {
    // Catch any unexpected errors
    return next(new AppError("Authentication failed. Please try again.", 401));
  }
};

const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
  if (req.cookies.jwt) {
    try {
      const decoded = await verifyToken(
        req.cookies.jwt,
        process.env.JWT_SECRET,
      );

      const currentUser = await User.findById(decoded.id);

      if (!currentUser) {
        return next(new AppError("There is no user with email address.", 404));
      }

      if (currentUser.changedPasswordAfter(decoded.iat as number)) {
        return next();
      }

      // THERE IS A LOGGED IN USER
      res.locals.user = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};

const restrictTo = (...roles: string[]): RequestHandler => {
  return (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user'
    const authReq = req as UserRequest;

    if (!roles.includes(authReq.user!.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403),
      );
    }

    next();
  };
};

const forgotPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // 1) Get user based on POSTed email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(new AppError("There is no user with email address.", 404));
    }

    // 2) Generate the random reset token
    // const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // 3) Send it to user's email
    try {
      // const resetURL = `${req.protocol}://${req.get(
      //   "host",
      // )}/api/v1/users/resetPassword/${resetToken}`;
      // await new Email(user, resetURL).sendPasswordReset();

      res.status(200).json({
        status: "success",
        message: "Token sent to email!",
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });

      return next(
        new AppError(
          "There was an error sending the email. Try again later!",
          500,
        ),
      );
    }
  },
);

const resetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // 1) Get user based on the token
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    // 2) If token has not expired, and there is user, set the new password
    if (!user) {
      return next(new AppError("Token is invalid or has expired", 400));
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();

    // After saving, unset reset fields with an update
    await User.updateOne(
      { _id: user._id },
      { $unset: { passwordResetToken: 1, passwordResetExpires: 1 } },
    );

    // 3) Update changedPasswordAt property for the user
    // 4) Log the user in, send JWT
    createSendToken(user, 200, req, res);
  },
);

const updatePassword = catchAsync(
  async (req: UserRequest, res: Response, next: NextFunction) => {
    // 1) Get user from collection
    const user: IUser = await User.findById(req.user!.id).select("+password");

    // 2) Check if POSTed current password is correct
    if (
      !(await user.correctPassword(req.body.passwordCurrent, user.password))
    ) {
      return next(new AppError("Your current password is wrong.", 401));
    }

    // 3) If so, update password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();
    // User.findByIdAndUpdate will NOT work as intended!

    // 4) Log user in, send JWT
    createSendToken(user, 200, req, res);
  },
);
export {
  signup,
  login,
  logout,
  protect,
  isLoggedIn,
  restrictTo,
  forgotPassword,
  resetPassword,
  updatePassword,
};
