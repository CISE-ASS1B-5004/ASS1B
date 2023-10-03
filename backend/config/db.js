const mongoose = require("mongoose");
const db = process.env.MONGO_URI; // Access the MongoDB URI from the environment variables

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB is Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
