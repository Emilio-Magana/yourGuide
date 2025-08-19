import { Request, Response, NextFunction } from "express";

interface ExpressMiddleware {
  req: Request;
  res: Response;
  next: NextFunction;
}

export type { ExpressMiddleware };
