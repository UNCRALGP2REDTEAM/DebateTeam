var config = require('./config/auth.js');
var passport = require('passport');
var User = require("./models/user.js");
var jwt = require('jsonwebtoken');
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = config.jwtSecret;

var jwtStrategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  // usually this would be a database call:
  User.find("id = '" + jwt_payload.user_id + "'", function(user) {
    console.log(JSON.stringify(user));
    if (user.length != 1) {
      return next(null, false, { message: 'Incorrect username.' });
    }
    return next(null, user[0]);
  });
});

passport.use(jwtStrategy);

module.exports = passport;