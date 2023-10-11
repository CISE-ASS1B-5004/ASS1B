const dotenv = require('dotenv');
switch (process.env.NODE_ENV) {
  case 'development':
    dotenv.config({ path: '.env.development' });
    break;
  case 'test':
    dotenv.config({ path: '.env.test' });
    break;
  default:
    dotenv.config();
}

const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

// routes
const books = require("./routes/api/articles");
const moderator = require("./routes/api/moderator");
const admin = require("./routes/api/admin");
const app = express();



// Connect Database
connectDB()
  .then(() => {
    console.log("connectDB() done with ",process.env.NODE_ENV);
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json());
// app.use(express.json({ extended: false }));

app.get("/", (req, res) =>
  res.status(200).json("Welcome, your app is working well")
);

// use Routes
app.use("/api/articles", books);
app.use("/api/moderator", moderator);
app.use("/api/admin", admin);

if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 8082;
  const server = app.listen(port, () => console.log(`Server running on port ${port}`));

  module.exports = { app, server };
} else{
  const port = process.env.PORT || 8082; // Use the PORT environment variable or default to 8082

  app.listen(port, () => console.log(`Server is running on port ${port}`));
}
// module.exports = server;
