import app from "./app";
import { envVars } from "./app/config/env";
import { connectDB, disconnectDB } from "./app/db/ConnectDb";
const port = envVars.PORT;

const server = async () => {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`Lms Sass Server is running on http://localhost:${port}`);
        });
    } catch (error) {
        await disconnectDB();
        console.log(error);
    }
};

const shutdown = async () => {
    console.log("Shutting down...");
    await disconnectDB();
    app.listen(port, () => {
        console.log(`Lms Sass Server is running on http://localhost:${port}`);
    }).close(() => process.exit(0));
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

server();