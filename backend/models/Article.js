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
  method: {
    type: String,
    required: true,
  },
  subClaims: {
    type: String,
    required: true,
  },
  analystClaims: {
    type: String,
    default: "",
  },
  isForClaim: {
    type: String,
    default: false,
  },
  strengthOfClaim: {
    type: String,
    default: "",
  },
  evidence: {
    type: String,
    default: "",
  },
  isApprovedByModerator: {
    type: Boolean,
    default: false,
  },
  isRejectedByModerator: {
    type: Boolean,
    default: false,
  },
  isApprovedByAnalyst: {
    type: Boolean,
    default: false,
  },
  isRejectedByAnalyst: {
    type: Boolean,
    default: false,
  },
});

module.exports = Article = mongoose.model("article", ArticleSchema);
