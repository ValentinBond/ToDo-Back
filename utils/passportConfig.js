const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
const { User } = require('@scheme');


passport.use(new JwtStrategy({
  jwtFromRequest: req => req.headers.authorization && req.headers.authorization.split(' ')[1] || null,
  secretOrKey: process.env.SALT
}, async (jwt_payload, done) => {
  try {
    const user = await User.findOne({ _id: jwt_payload.id });
    if (user) {
      if (Date.now() < jwt_payload.exp) {
        return done('jwt expired');
      }
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err, false);
  }
}));