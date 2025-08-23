import { Request, Response, NextFunction } from "express";
import { IUser } from "@/backend/models/userModel";

interface AuthenticatedRequest extends Request {
  user: IUser;
}

interface ExpressMiddleware {
  req: AuthenticatedRequest;
  res: Response;
  next: NextFunction;
}

export type { ExpressMiddleware, AuthenticatedRequest };
