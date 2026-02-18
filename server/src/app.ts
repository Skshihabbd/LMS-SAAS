import express, { Application, Request, Response } from "express";
import cors from "cors";

const app: Application = express()
// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: [process.env.FRONTEND_URL as string, "http://localhost:3000", "http://localhost:5000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))
// Middleware to parse JSON bodies
app.use(express.json());

// Basic route
app.get('/', async (req: Request, res: Response) => {
    res.status(201).json({
        success: true,
        message: 'API is working',
    })
});

export default app;