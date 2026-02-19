import {  User } from "./user.model";
import httpStatus from "http-status";
import { IUser } from "./user.interface";
import AppError from "../../errors/AppError";

const createUser = async (payload: IUser) => {

  // 🔎 Email already exists কিনা check
  const isExist = await User.findOne({ email: payload.email });

  if (isExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email already exists");
  }

  const result = await User.create(payload);
  return result;
};



export const userService = {
    createUser
}