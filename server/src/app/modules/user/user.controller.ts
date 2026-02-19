import { Request, Response } from "express"
import { userService } from "./user.service";
import { sendResponse } from "../../shared/sendResponse";
import { catchAsync } from "../../shared/catchAsync";
import status from "http-status";

const createUserIntoDB = catchAsync(
    async (req: Request, res: Response) => {
        const payload = req.body;
        const result = await userService.createUser(payload);
        sendResponse(res, {
            statusCode: status.OK,
            success: true,
            message: "Category created successfully",
            data: result
        });;
    }
);

export const userController = {
    createUserIntoDB
}