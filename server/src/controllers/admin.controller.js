const passport = require("passport");
require("sequelize");

const login = (req, res, next) => {
  const strategyName = "local";
  passport.authenticate(strategyName, (err, admin, info) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error." });
    }
    if (!admin) {
      return res.redirect("/");
    }
    req.login(admin, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error." });
      }
      return res.redirect("/dashboard");
    });
  })(req, res, next);
};

const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

module.exports = { login, logout };
