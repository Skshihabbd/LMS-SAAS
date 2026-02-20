import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { envVars } from "./env";
import { User } from "../modules/user/user.model";

passport.use(
  new GoogleStrategy(
    {
      clientID: envVars.GOOGLE_CLIENT_ID,
      clientSecret: envVars.GOOGLE_CLIENT_SECRET,
      callbackURL: envVars.GOOGLE_CALLBACK_URL,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails?.[0].value });

        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email: profile.emails?.[0].value,
            role: "student", // ✅ default role
            password: undefined, // ✅ TypeScript safe
          });
        }
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

// Credential Login Strategy
passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
     
      const user = await User.findOne({ email });
      

      if (!user) return done(null, false);
      if (!user.password) return done(null, false);

      const isMatch = await bcrypt.compare(password, user.password);
     

      if (!isMatch) return done(null, false);

      return done(null, user);
    }
  )
);
export default passport;