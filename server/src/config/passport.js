const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const Admin = require("../models/admin.model");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const admin = await Admin.findOne({ where: { email: email } });

        if (!admin) {
          return done(null, false, { message: "Incorrect email." });
        }

        const passwordMatch = await bcrypt.compare(password, admin.password);

        if (!passwordMatch) {
          return done(null, false, { message: "Incorrect password." });
        }

        return done(null, admin);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((admin, done) => {
  try {
    const user = {
      id: admin.id,
      email: admin.email,
    };
    done(null, user);
  } catch (err) {
    done(err, false);
  }
});

passport.deserializeUser(async (user, done) => {
  try {
    const serializedAdmin = await Admin.findOne({
      where: { id: user.id, email: user.email },
    });
    done(null, serializedAdmin.toJSON());
  } catch (error) {
    done(err, false);
  }
});

module.exports = passport;
