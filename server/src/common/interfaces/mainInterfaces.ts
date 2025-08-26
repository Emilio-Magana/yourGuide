import { type Request, type Response, type NextFunction } from "express";
import { type IUser } from "@server/models/userModel";

interface AuthenticatedRequest extends Request {
  user: IUser;
}

interface ExpressMiddleware {
  req: AuthenticatedRequest;
  res: Response;
  next: NextFunction;
}

export type { ExpressMiddleware, AuthenticatedRequest };
