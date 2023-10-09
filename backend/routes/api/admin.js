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
  // @route GET api/articles
// @description Get all articles
// @access Public
router.get("/", (req, res) => {
    Article.find()
      .then((articles) => res.json(articles))
      .catch((err) =>
        res.status(404).json({ noarticlesfound: "No Articles found" })
      );
  });
  
  // @route GET api/articles/:id
  // @description Get single article by id
  // @access Public
  router.get("/:id", (req, res) => {
    Article.findById(req.params.id)
      .then((article) => res.json(article))
      .catch((err) =>
        res.status(404).json({ noarticlefound: "No Article found" })
      );
  });
});

module.exports = router;
