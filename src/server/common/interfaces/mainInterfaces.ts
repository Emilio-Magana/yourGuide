import { type Request } from "express";
import { type IUser } from "./../../models/userModel";

interface UserRequest extends Request {
  user?: IUser;
}

export type { UserRequest };
