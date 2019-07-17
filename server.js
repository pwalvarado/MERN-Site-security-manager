const express = require("express");
const connectDB = require("./config/db");
const authRouter = require("./routes/api/auth");
const profileRouter = require("./routes/api/profile");
const accessesRouter = require("./routes/api/accesses");
const usersRouter = require("./routes/api/users");

const app = express();

// connect database
connectDB();

// init middleware (instead of bodyParser)
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API running..."));

// define routes
app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.use("/api/accesses", accessesRouter);
app.use("/api/users", usersRouter);

module.exports = app;
