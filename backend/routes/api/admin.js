const express = require("express");
const router = express.Router();

// Load Article model
const Article = require("../../models/Article");

// @route GET api/admin/test
// @description tests admin route
// @access Public
router.get("/test", (req, res) => res.send("admin route testing!"));

// @route GET api/admin
// @description Get all articles for the admin
// @access Admin only
router.get("/", (req, res) => {
  const userRole = req.get('user-role');
  
  // Check if the user role is Admin
  if (userRole !== 'Admin') {
    return res.status(403).json({ error: "Access Denied: You are not an Admin!" });
  }

  // Find all articles regardless of their approval status
  Article.find({})
    .then((articles) => {
      if (articles.length === 0) {
        return res.status(404).json({ noarticlesfound: "No Articles found" });
      }
      res.json(articles);
    })
    .catch((err) =>
      res.status(500).json({ error: "An error occurred while retrieving the articles" })
  );
});

module.exports = router;
