const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/user");
const config = require("config");
const secret = config.get("jwtSecret");
const { validationResult, check } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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

// @route         POST api/auth
// @description   Authenticate user and get token
// @access        Public
router.post(
  "/",
  [
    check("email", "Email is required").exists(),
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    try {
      // see if user exists
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      // return jsonwebtoken
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(payload, secret, { expiresIn: 36000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
