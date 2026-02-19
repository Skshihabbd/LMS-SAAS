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
};

const loadConfig = (): envConfig => {
    const requireVariables = [
        "PORT",
        "NODE_ENV",
        "DATABASE_URL",
        "FRONTEND_URL",
        "JWT_SECRET",
        "ADMIN_EMAIL",
        "ADMIN_PASS"
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
    };
};

export const envVars = loadConfig();