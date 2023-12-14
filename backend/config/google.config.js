import passport from "passport";

const googleOAuth = require("passport-google-oauth20");
const { Users } = require("../models/allModels");

const GoogleStrategy = googleOAuth.Strategy;

const googleAuthConfig= (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GoogleClientID,
        clientSecret: process.env.GoogleClientSecret,
        callbackURL: "http://localhost:5000/auth/google/callback",
      },
      async function (accessToken, refreshToken, profile, done) {
        const newUser = {
          fullname: profile.displayName,
          email: profile.emails[0].value,
          profilePic: profile.photos[0].value,
          password:profile.id,
        };
        // console.log(profile); => To check what it returns
        try {
          // check if the user already exists
          const user = await Users.findOne({ email: newUser.email });
          console.log(user);

          if (user) {
            // generate token
            const token = user.generateJwtTokens();

            // return user
            done(null, { user, token });
          } else {
            // create new user
            const user = await Users.create(newUser);

            // generate token
            const token = user.generateJwtTokens();

            // return null
            done(null, { user, token });
          }
        } catch (error) {
          done(error, null);
        }
      }
    )
  );
  passport.serializeUser((userData,done)=>done(null,{...userData}));
  passport.deserializeUser((id,done)=>done(null,id));
};

module.exports={
    googleAuthConfig
}
