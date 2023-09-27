const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config(); // Load environment variables

// routes
const books = require("./routes/api/articles");
const moderator = require("./routes/api/moderator");

const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("Hello world!"));

// use Routes
app.use("/api/articles", books);
app.use("/api/moderator", moderator);

const port = process.env.PORT || 8082; // Use the PORT environment variable or default to 8082

const server = app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = server;