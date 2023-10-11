const express = require("express");
const router = express.Router();

const Article = require("../../models/Article");

// @route GET api/admin/test
router.get("/test", (req, res) => res.send("admin route testing!"));

// @route GET api/admin
router.get("/", (req, res) => {
  const userRole = req.get('user-role');
  
  if (userRole !== 'Admin') {
    return res.status(403).json({ error: "Access Denied: You are not an Administrator!" });
  }

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

// Add more routes as necessary for other administrative functions (e.g., edit, delete, etc.)

module.exports = router;
