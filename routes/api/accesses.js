const express = require("express");
const router = express.Router();
const { validationResult, check } = require("express-validator");
const auth = require("../../middleware/auth");

const User = require("../../models/user");
const Profile = require("../../models/profile");
const Access = require("../../models/Access");

// @route         GET api/accesses
// @description   Log for employee ins/outs
// @access        Public
router.post(
  "/",
  [
    auth,
    [
      check("accesstype", "Access type is required")
        .not()
        .isEmpty(),
      check("user", "User type is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { user, accesstype } = req.body;
      const access = new Access({ user, accesstype });
      await access.save();
      return res.json(access);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
