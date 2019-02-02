const passport = require("passport");
const keys = require("../config/keys");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("access", accessToken);
      console.log("refresh token", refreshToken);
      console.log("profile", profile);
    }
  )
);
