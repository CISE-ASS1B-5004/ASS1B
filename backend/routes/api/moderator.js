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
// @access Public
router.get("/", (req, res) => {
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
// @access Public (Consider changing to Private or Protected)
router.put("/approve/:id", (req, res) => {
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
// @access Public (Consider changing to Private or Protected)
router.put('/reject/:id', (req, res) => {
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

module.exports = router;



// function ensureModerator(req, res, next) {
//   if (req.session && req.session.user && req.session.user.role === 'Moderator') {
//     return next();
//   }
//   res.status(403).send('Access Denied: You are not a Moderator!');
// }



// router.get("/", (req, res) => {
//   Article.find({ isApprovedByModerator: false })
//     .then((articles) => res.json(articles))
//     .catch((err) =>
//       res.status(404).json({ noarticlesfound: "No Articles found in the moderation queue" })
//   );
// });


// // @route GET api/moderator
// // @description Get all articles in the moderation queue
// // @access Moderator only
// router.get("/", ensureModerator, (req, res) => {
//   // This logic runs only when the role of the user is a moderator.
//   Article.find({ isApprovedByModerator: false })
//     .then((articles) => res.json(articles))
//     .catch((err) =>
//       res.status(404).json({ noarticlesfound: "No Articles found in the moderation queue" })
//   );
// });

// @route GET api/moderator/:id
// @description Get single article by id
// @access Public
// router.get("/:id", (req, res) => {
//   Article.findById(req.params.id)
//     .then((article) => res.json(article))
//     .catch((err) =>
//       res.status(404).json({ noarticlefound: "No Article found" })
//     );
// });

// @route GET api/moderator
// @description add/save article
// @access Public
// router.post("/", (req, res) => {
//   Article.create(req.body)
//     .then((article) => res.json({ msg: "Article added successfully" }))
//     .catch((err) =>
//       res.status(400).json({ error: "Unable to add this article" })
//     );
// });

// // @route GET api/moderator/:id
// // @description Update article
// // @access Public
// router.put("/:id", (req, res) => {
//   Article.findByIdAndUpdate(req.params.id, req.body)
//     .then((article) => res.json({ msg: "Updated successfully" }))
//     .catch((err) =>
//       res.status(400).json({ error: "Unable to update the Database" })
//     );
// });

// // @route GET api/moderator/:id
// // @description Delete article by id
// // @access Public
// router.delete("/:id", (req, res) => {
//   Article.findByIdAndRemove(req.params.id)
//     .then((article) => res.json({ msg: "Article entry deleted successfully" }))
//     .catch((err) => res.status(404).json({ error: "No such an article" }));
// });
