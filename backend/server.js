import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import jobRoutes from "./routes/jobRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import {
notFound,
errorHandler,
} from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

// DB Connection
connectDB();

// Middlewares
app.use(cors({ origin: "*" }));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
res.json({ message: "API Running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

// Error Handlers (MUST be last)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
