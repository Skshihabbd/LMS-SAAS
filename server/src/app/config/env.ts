import dotenv from "dotenv";

dotenv.config();

interface envConfig {
    PORT: string;
    NODE_ENV: string;
    DATABASE_URL: string;
    FRONTEND_URL: string;
    JWT_SECRET: string;
    ADMIN_EMAIL: string;
    ADMIN_PASS: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    GOOGLE_CALLBACK_URL: string;
};

const loadConfig = (): envConfig => {
    const requireVariables = [
        "PORT",
        "NODE_ENV",
        "DATABASE_URL",
        "FRONTEND_URL",
        "JWT_SECRET",
        "ADMIN_EMAIL",
        "ADMIN_PASS",
        "GOOGLE_CLIENT_ID",
        "GOOGLE_CLIENT_SECRET",
        "GOOGLE_CALLBACK_URL"
    ];

    requireVariables.forEach((variable) => {
        if (process.env[variable] === undefined) {
            throw new Error(`Environment variable ${variable} is not defined`);
        }
    });

    return {
        PORT: process.env.PORT as string,
        NODE_ENV: process.env.NODE_ENV as string,
        DATABASE_URL: process.env.DATABASE_URL as string,
        FRONTEND_URL: process.env.FRONTEND_URL as string,
        JWT_SECRET: process.env.JWT_SECRET as string,
        ADMIN_EMAIL: process.env.ADMIN_EMAIL as string,
        ADMIN_PASS: process.env.ADMIN_PASS as string,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
        GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL as string
    };
};

export const envVars = loadConfig();