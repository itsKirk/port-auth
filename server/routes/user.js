const express = require("express");
const { isAuthenticated } = require("../middleware/requireAuth");
const router = express.Router();
// GET all universities
router.get("/", isAuthenticated, async (req, res) => {
  const { user } = req;
  if (user) {
    const loggedInUser = {
      id: user._id,
      name: user.name,
    };
    res.status(200).json({ user: loggedInUser });
  } else {
    res.status(404).json(null);
  }
});

module.exports = router;
