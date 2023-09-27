const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  authors: {
    type: [String], // Array of strings for multiple authors
    required: true,
  },
  journalName: {
    type: String,
    required: true,
  },
  pubYear: {
    type: Number,
    required: true,
  },
  volume: {
    type: Number,
    required: true,
  },
  pages: {
    type: Number,
    required: true,
  },
  doi: {
    type: String,
    required: true,
  },
  claims: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    required: true,
  },
});

module.exports = Article = mongoose.model("article", ArticleSchema);
