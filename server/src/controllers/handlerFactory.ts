import { Model, Document, type PopulateOptions } from "mongoose";
import AppError from "@server/utils/appError";
import APIFeatures from "@server/utils/apiFeatures";
import { catchAsync } from "@server/utils/catchAsync";
import { type ExpressMiddleware } from "@server/common/interfaces/mainInterfaces";

const deleteOne = <T extends Document>(Model: Model<T>) =>
  catchAsync(async ({ req, res, next }: ExpressMiddleware) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });

const updateOne = <T extends Document>(Model: Model<T>) =>
  catchAsync(async ({ req, res, next }: ExpressMiddleware) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

const createOne = <T extends Document>(Model: Model<T>) =>
  catchAsync(async ({ req, res, next }: ExpressMiddleware) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

const getOne = <T extends Document>(
  Model: Model<T>,
  popOptions?: PopulateOptions
) =>
  catchAsync(async ({ req, res, next }: ExpressMiddleware) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

const getAll = <T extends Document>(Model: Model<T>) =>
  catchAsync(async ({ req, res, next }: ExpressMiddleware) => {
    // To allow for nested GET reviews on tour (hack)
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // const doc = await features.query.explain();
    const doc = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });

export { deleteOne, updateOne, createOne, getOne, getAll };
