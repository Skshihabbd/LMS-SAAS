import app from "./app";
const port = process.env.PORT;

const server = async () => {
    try {
        app.listen(process.env.PORT, () => {
            console.log(`Lms Sass Server is running on http://localhost:${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

server();