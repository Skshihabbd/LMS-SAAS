import mongoose from "mongoose";
import { envVars } from "../config/env";

export const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(envVars.DATABASE_URL, {
            dbName: "LmsSaas"
        });
        console.log("MongoDB connected");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    }
};

export const disconnectDB = async (): Promise<void> => {
    await mongoose.disconnect();
};