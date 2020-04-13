const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;

passport.use('jwt', new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret'
}, (jwt_payload, done) => {
  console.log('====================');
  console.log('JwtStrategy', jwt_payload);
  // User.findOne({id: jwt_payload.sub}, function(err, user) {
  //   if (err) {
  //     return done(err, false);
  //   }
  //   if (user) {
  //     return done(null, user);
  //   } else {
  //     return done(null, false);
  //   }
  // });
}));