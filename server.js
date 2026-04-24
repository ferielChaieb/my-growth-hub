const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

// 🔐 charger env EN PREMIER
dotenv.config();

// test
console.log("Server starting...");

// connexion MongoDB
connectDB();

const app = express();

// 🔥 middlewares essentiels
app.use(cors({
  origin: "http://localhost:5173", // adapte si React autre port
  credentials: true
}));

app.use(express.json());
app.use(cookieParser()); // 🔥 IMPORTANT POUR REFRESH TOKEN

// routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/notes", require("./routes/learningNoteRoutes"));
app.use("/api/skills", require("./routes/skillRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));

// test route
app.get("/", (req, res) => {
  res.send("API MyGrowth Hub is running");
});

// port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});