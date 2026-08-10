require("dotenv").config();
require("./config/db");

const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const app = express();
const authRoutes = require("./routes/authRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const knowledgeRoutes = require("./routes/knowledgeRoutes");
const taskRoutes = require("./routes/taskRoutes");

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/knowledge", knowledgeRoutes);
app.use("/api/tasks", taskRoutes);
app.get("/", (req, res) => {
    res.send("💙 Bienvenido a ReSolve API");
});

module.exports = app;