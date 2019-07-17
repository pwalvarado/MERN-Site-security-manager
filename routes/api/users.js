const express = require("express");
const router = express.Router();
const { validationResult, check } = require("express-validator");
const User = require("../../models/user");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const secret = config.get("jwtSecret");
const auth = require("../../middleware/auth");

// @route         POST api/users
// @description   Register user
// @access        Publinc
router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { name, email, password } = req.body;

    try {
      // see if user exists
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      // get user gravatar
      const avatar = gravatar.url({
        s: "200", //size
        r: "pg", //no naked
        d: "mm" //default image
      });

      user = new User({
        name,
        email,
        avatar,
        password
      });

      // encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      // return jsonwebtoken
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(payload, secret, { expiresIn: 36000 }, (err, token) => {
        if (err) throw err;
        return res.json({ token });
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send("Server error");
    }
  }
);

// @route         GET api/users
// @description   Get users list
// @access        Private
router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find().select("name avatar");
    return res.json(users);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});
module.exports = router;
