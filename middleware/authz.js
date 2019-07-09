// https://stackoverflow.com/questions/47515991/how-to-setup-an-authentication-middleware-in-express-js
const User = require("../../models/user");

module.exports = function(req, res, next) {
  User.findById(req.user).exec(function(error, user) {
    if (error) {
      return next(error);
    } else {
      if (user === null) {
        var err = new Error("Not authorized! Go back!");
        err.status = 400;
        return next(err);
      } else {
        if (user.admin) return next();
        else return res.status(401).json({ msg: "User is not an admin" });
      }
    }
  });
};
