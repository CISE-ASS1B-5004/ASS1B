const express = require("express");
const router = express.Router();

// Load Article model
const Article = require("../../models/Article");

// @route GET api/moderator/test
// @description tests moderator route
// @access Public
router.get("/test", (req, res) => res.send("moderator route testing!"));

// @route GET api/moderator
// @description Get all articles in the moderation queue
// @access Moderator only
router.get("/", (req, res) => {
  const userRole = req.get('user-role');
  if (userRole !== 'Moderator') {
    return res.status(403).json({ error: "Access Denied: You are not a Moderator!" });
  }

  Article.find({ isApprovedByModerator: false, isRejectedByModerator: false })
    .then((articles) => {
      if (articles.length === 0) {
        return res.status(404).json({ noarticlesfound: "No Articles found in the moderation queue" });
      }
      res.json(articles);
    })
    .catch((err) =>
      res.status(500).json({ error: "An error occurred while retrieving the articles" })
  );
});

// @route PUT api/moderator/approve/:id
// @description Approve an article in the moderation queue
// @access Moderator only
router.put("/approve/:id", (req, res) => {
  const userRole = req.get('user-role');
  if (userRole !== 'Moderator') {
    return res.status(403).json({ error: "Access Denied: You are not a Moderator!" });
  }

  Article.findByIdAndUpdate(
    req.params.id, 
    { isApprovedByModerator: true },
    { new: true } // Return the updated object
  )
  .then((article) => res.json({ msg: "Updated successfully" }))
  .catch((err) =>
    res.status(400).json({ error: "Unable to update the Database" })
  );
});

// @route PUT api/moderator/reject/:id
// @description Reject an article in the moderation queue
// @access Moderator only
router.put('/reject/:id', (req, res) => {
  const userRole = req.get('user-role');
  if (userRole !== 'Moderator') {
    return res.status(403).json({ error: "Access Denied: You are not a Moderator!" });
  }

  Article.findByIdAndUpdate(
    req.params.id, 
    { isRejectedByModerator: true },
    { new: true } // Return the updated object
  )
  .then((article) => res.json({ msg: "Updated successfully" }))
  .catch((err) =>
    res.status(400).json({ error: "Unable to update the Database" })
  );
});

// @route GET api/moderator/archive
// @description Get all articles in the archive
// @access Moderator only
router.get("/archive", (req, res) => {
  const userRole = req.get('user-role');
  if (userRole !== 'Moderator') {
    return res.status(403).json({ error: "Access Denied: You are not a Moderator!" });
  }

  // Find articles that are rejected by either Moderator or Analyst
  Article.find({ $or: [{ isRejectedByModerator: true }, { isRejectedByAnalyst: true }] })
    .then((articles) => {
      if (articles.length === 0) {
        return res.status(404).json({ noarticlesfound: "No Articles found in the archive" });
      }
      res.json(articles);
    })
    .catch((err) =>
      res.status(500).json({ error: "An error occurred while retrieving the articles" })
  );
});

// @route PUT api/moderator/peerReview/:id
// @description Update the article with a peer review
// @access Moderator only
router.put("/peerReview/:id", (req, res) => {
  // const userRole = req.get('user-role');
  // if (userRole !== 'Moderator') {
  //   return res.status(403).json({ error: "Access Denied: You are not a Moderator!" });
  // }

  const { review } = req.body;

  Article.findByIdAndUpdate(
    req.params.id, 
    { review },
    { new: true } // Return the updated object
  )
  .then((article) => res.json({ msg: "Updated successfully" }))
  .catch((err) =>
    res.status(400).json({ error: "Unable to update the Database" })
  );
});

module.exports = router;