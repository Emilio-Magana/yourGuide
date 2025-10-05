import multer, { type FileFilterCallback } from "multer";
import type { NextFunction, Request, Response } from "express";
import sharp from "sharp";
import User from "./../models/userModel";
import AppError from "./../utils/appError";
import { catchAsync } from "./../utils/catchAsync";
import type { UserRequest } from "./../common/interfaces/mainInterfaces";
import { deleteOne, updateOne, getOne, getAll } from "./handlerFactory";

const multerStorage = multer.memoryStorage();

const multerFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 401));
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const uploadUserPhoto = upload.single("photo");

const resizeUserPhoto = catchAsync(
  async (req: UserRequest, res: Response, next: NextFunction) => {
    if (!req.file) return next();
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`public/img/users/${req.file.filename}`);

    next();
  },
);

const filterObj = (
  obj: Record<string, any>,
  ...allowedFields: any[]
): Record<string, any> => {
  const newObj: Record<string, any> = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

const getMe = (req: UserRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ message: "User not authenticated" });
  }
  req.params.id = req.user.id;
  next();
};

const updateMe = catchAsync(
  async (req: UserRequest, res: Response, next: NextFunction) => {
    // 1) Create error if user POSTs password data
    if (req.body.password || req.body.passwordConfirm) {
      return next(
        new AppError(
          "This route is not for password updates. Please use /updateMyPassword.",
          400,
        ),
      );
    }

    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // 2) Filtered out unwanted fields names that are not allowed to be updated
    const filteredBody = filterObj(req.body, "name", "email");
    if (req.file) filteredBody.photo = req.file.filename;

    // 3) Update user document
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      filteredBody,
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({
      status: "success",
      data: {
        user: updatedUser,
      },
    });
  },
);

const deleteMe = catchAsync(
  async (req: UserRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    await User.findByIdAndUpdate(req.user.id, { active: false });

    res.status(204).json({
      status: "success",
      data: null,
    });
  },
);

const createUser = (req: Request, res: Response) => {
  res.status(500).json({
    status: "error",
    message: "This route is not defined! Please use /signup instead",
  });
};

const getUser = getOne(User);
const getAllUsers = getAll(User);

// Do NOT update passwords with this!
const updateUser = updateOne(User);
const deleteUser = deleteOne(User);

export {
  uploadUserPhoto,
  resizeUserPhoto,
  getMe,
  updateMe,
  deleteMe,
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
};
