var config = require('./config/auth.js');
var passport = require('passport');
var db = require("./models");
var jwt = require('jsonwebtoken');
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = config.jwtSecret;

var jwtStrategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  db.User.findOne({where: {id: jwt_payload.user_id}}).then( function(user) {
    console.log(JSON.stringify(user));
    if (!user) {
      console.log("In invalid creds handler. User was null.");
      return next(null, false, { message: 'Invalid user credentials.' });
    } else {
      console.log("In jwt success handler. User was not null.");
      return next(null, user);
    }
  });
});

passport.use(jwtStrategy);

module.exports = passport;