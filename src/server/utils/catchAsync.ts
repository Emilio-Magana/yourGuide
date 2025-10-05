import { type Request, type Response, type NextFunction } from "express";
// interface ExpressMiddleware {
//   req: Request;
//   res: Response;
//   next: NextFunction;
// }

export const catchAsync = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};
