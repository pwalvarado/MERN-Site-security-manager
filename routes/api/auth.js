const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/user");

// @route         GET api/auth
// @description   Test route
// @access        Publinc
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    return res.send(user);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
