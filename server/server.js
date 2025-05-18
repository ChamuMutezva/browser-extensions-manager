import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
const app = express();
app.use(
    cors({
        origin: "http://localhost:5500", // Replace with your frontend's URL
    })
);
app.use(express.json());

const PORT = process.env.PORT || 3000;

mongoose
    .connect(MONGO_URI, {
        serverSelectionTimeoutMS: 30000, // 30s timeout
        socketTimeoutMS: 45000,
        family: 4, // Force IPv4
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });

const extensionSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    logo: String,
    name: String,
    description: String,
    isActive: Boolean,
});

const Extension = mongoose.model(
    "Extension",
    extensionSchema,
    "browser-extension-manager"
);

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.get("/api/extensions", async (req, res) => {
    try {
        const extensions = await Extension.find();
        res.json(extensions);
    } catch (error) {
        console.error("Error fetching extensions:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
