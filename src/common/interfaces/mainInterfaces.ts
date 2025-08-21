import { IUser } from "@/models/userModel";
import { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
  user: IUser;
}

interface ExpressMiddleware {
  req: AuthenticatedRequest;
  res: Response;
  next: NextFunction;
}

export type { ExpressMiddleware, AuthenticatedRequest };
