import dotenv from "dotenv";
import connectDB from "./config/database.js";
import app from "./app.js";

dotenv.config({
    path: './.env',
});

const startServer = async () => {
    try {
        await connectDB();
        app.on("error", (error) => {
            console.log("ERROR", error);
            throw error;
            console.log("Mongo URI:", process.env.MONGODB_URI);

        });

        app.listen(process.env.PORT || 8000, () => {
            console.log(`Sever runniong on port:, ${process.env.PORT}`);

        });
    } catch (error) {
        console.log("MongoDB connectio failed", error);
        console.log("Mongo URI:", process.env.MONGODB_URI);

    }
}



startServer();