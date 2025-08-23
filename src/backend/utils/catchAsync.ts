import { Request, Response, NextFunction } from "express";
interface ExpressMiddleware {
  req: Request;
  res: Response;
  next: NextFunction;
}

export const catchAsync = (fn: Function) => {
  return ({ req, res, next }: ExpressMiddleware) => {
    fn(req, res, next).catch(next);
  };
};
