const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(new GoogleStrategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
  },
  (accessToken, refreshToken, profile, done) => {
    // Aquí normalmente guardarías el usuario en la base de datos
    return done(null, profile);
  }
));

// Serializar el usuario en la sesión
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserializar el usuario de la sesión
passport.deserializeUser((obj, done) => {
  done(null, obj);
});
