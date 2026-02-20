import express, { Application, Request, Response } from "express";
import cors from "cors";
import { envVars } from "./app/config/env";
import { indexRoutes } from "./app/routes";
import globalErrorHandler from "./app/errors/globalErrorHandler";
import passport from "./app/config/passport";

const app: Application = express()

app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: [envVars.FRONTEND_URL, "http://localhost:3000", "http://localhost:5000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use(passport.initialize());

app.use("/api/v1", indexRoutes);

app.use(globalErrorHandler);
// Basic route
app.get('/', async (req: Request, res: Response) => {
    res.status(201).json({
        success: true,
        message: 'API is workings',
    })
});

export default app;