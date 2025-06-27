import express from "express";
import dotenv from "dotenv";
import User from "./routes/User.js";
import configDatabase from "./config/database.js";
import cors from "cors";
import studentRoutes from "./routes/student.js";
import blogRoutes from "./routes/blog.js";
import eventRoutes from "./routes/Event.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
configDatabase();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", User);
app.use("/student", studentRoutes);
app.use('/blog',blogRoutes);
app.use('/event',eventRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("API is running");
});

// Start Server
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
