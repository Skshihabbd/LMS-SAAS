/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from "express";
import passport from "passport";
import status from "http-status";
import { userService } from "./user.service";
import { sendResponse } from "../../shared/sendResponse";
import { catchAsync } from "../../shared/catchAsync";
import { generateToken } from "../../utils/generateToken";

// ✅ Create User
const createUserIntoDB = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const result = await userService.createUser(payload);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User created successfully",
    data: result,
  });
});

// ✅ Credential Login (Passport Local + JWT)
const loginWithCredential = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  passport.authenticate("local", { session: false }, (err: any, user: any) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return sendResponse(res, {
        statusCode: status.UNAUTHORIZED,
        success: false,
        message: "Invalid credentials",
        data: null,
      });
    }

    const token = generateToken(user);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Login successful",
      data: {
        token,
        user,
      },
    });
  })(req, res, next);
};



export const userController = {
  createUserIntoDB,
  loginWithCredential,
};
