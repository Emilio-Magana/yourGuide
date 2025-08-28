import { type Request } from "express";
import { type IUser } from "@server/models/userModel";

interface UserRequest extends Request {
  user: IUser;
}

export type { UserRequest };
