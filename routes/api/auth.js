const express = require("express");
const router = express.Router();

// @route         GET api/auth
// @description   Test route
// @access        Publinc
router.get("/", (req, res) => res.send("Auth route"));

module.exports = router;
