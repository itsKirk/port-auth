const express = require("express");
const University = require("../models/University");
const { isAuthenticated } = require("../middleware/requireAuth");
const router = express.Router();
// GET all universities
router.get("/", isAuthenticated, async (req, res) => {
  try {
    const universities = await University.find();
    console.log({
      sessionFromUniversity: req.session,
      auth: req.isAuthenticated(),
    });
    res.json(universities);
  } catch (error) {
    console.error("Error fetching universities:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
