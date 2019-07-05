const express = require('express')
const connectDB = require('./config/db')
const authRouter = require("./routes/api/auth");
const profileRouter = require("./routes/api/profile");
const postsRouter = require("./routes/api/posts");
const usersRouter = require("./routes/api/users");

const app = express()

// connect database
connectDB();

app.get('/', (req, res) => res.send('API running...'))

// define routes
app.use("/api/auth", authRouter)
app.use("/api/profile", profileRouter)
app.use("/api/posts", postsRouter)
app.use("/api/users", usersRouter)


const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server starter on ${PORT}`))