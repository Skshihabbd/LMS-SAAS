/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken";
import { envVars } from "../config/env";

export const generateToken = (user: any) => {
    return jwt.sign(
        {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
        envVars.JWT_SECRET,
        { expiresIn: "7d" }
    );
};