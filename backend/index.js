const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config(); // Load environment variables

// routes
const books = require("./routes/api/articles");
const moderator = require("./routes/api/moderator");

const app = express();

// Connect Database
connectDB()
  .then(() => {
    console.log("MongoDB is Connected...");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json());

app.get("/", (req, res) =>
  res.status(200).json("Welcome, your app is working well")
);

// use Routes
app.use("/api/articles", books);
app.use("/api/moderator", moderator);

const port = process.env.PORT || 8082; // Use the PORT environment variable or default to 8082

let server; // Declare the server variable

if (!server) {
  // Check if server is not already defined
  server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
} else {
  // Throw an exception if server is already defined
  throw new Error("Server is already listening.");
}

module.exports = server;
