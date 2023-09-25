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
  source: {
    type: String,
    required: true,
  },
  pubYear: {
    type: Number,
    required: true,
  },
  doi: {
    type: String,
  },
  summary: {
    type: String,
  },
  linkedDiscussion: {
    type: String,
  },
});

module.exports = Article = mongoose.model("article", ArticleSchema);
