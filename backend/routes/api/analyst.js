const express = require("express");
const router = express.Router();

// Load Article model
const Article = require("../../models/Article");

// @route GET api/analyst/test
// @description tests Analyst route
// @access Public
router.get("/test", (req, res) => res.send("analyst route testing!"));

// @route GET api/analyst
// @description Get all articles in the analysis queue
// @access Analyst only
router.get("/", (req, res) => {
  const userRole = req.get('user-role');
  if (userRole !== 'Analyst') {
    return res.status(403).json({ error: "Access Denied: You are not an Analyst!" });
  }

  Article.find({ isApprovedByModerator: true })
    .then((articles) => {
      if (articles.length === 0) {
        return res.status(404).json({ noarticlesfound: "No Articles found in the analysis queue" });
      }
      res.json(articles);
    })
    .catch((err) =>
      res.status(500).json({ error: "An error occurred while retrieving the articles" })
  );
});

// @route PUT api/analyst/approve/:id
// @description Approve an article in the analysis queue to add to database
// @access Analyst only
router.put("/approve/:id", (req, res) => {
  const userRole = req.get('user-role');
  if (userRole !== 'Analyst') {
    return res.status(403).json({ error: "Access Denied: You are not an Analyst!" });
  }

  Article.findByIdAndUpdate(
    req.params.id, 
    { isApprovedByAnalyst: true },
    { new: true } // Return the updated object
  )
  .then((article) => res.json({ msg: "Updated successfully" }))
  .catch((err) =>
    res.status(400).json({ error: "Unable to update the Database" })
  );
});

// @route PUT api/analyst/reject/:id
// @description Reject an article in the moderation queue
// @access Analyst only
// router.put('/reject/:id', (req, res) => {
//   const userRole = req.get('user-role');
//   if (userRole !== 'Analyst') {
//     return res.status(403).json({ error: "Access Denied: You are not a Analyst!" });
//   }

//   Article.findByIdAndUpdate(
//     req.params.id, 
//     { isRejectedByAnalyst: true },
//     { new: true } // Return the updated object
//   )
//   .then((article) => res.json({ msg: "Updated successfully" }))
//   .catch((err) =>
//     res.status(400).json({ error: "Unable to update the Database" })
//   );
// });

// // @route GET api/analyst/archive
// // @description Get all articles in the archive
// // @access Analyst only
// router.get("/archive", (req, res) => {
//   const userRole = req.get('user-role');
//   if (userRole !== 'Analyst') {
//     return res.status(403).json({ error: "Access Denied: You are not a Analyst!" });
//   }

//   // Find articles that are rejected by either Analyst or Analyst
//   Article.find({ $or: [{ isRejectedByModerator: true }, { isRejectedByAnalyst: true }] })
//     .then((articles) => {
//       if (articles.length === 0) {
//         return res.status(404).json({ noarticlesfound: "No Articles found in the archive" });
//       }
//       res.json(articles);
//     })
//     .catch((err) =>
//       res.status(500).json({ error: "An error occurred while retrieving the articles" })
//   );
// });

module.exports = router;