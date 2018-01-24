var jwt = require('jsonwebtoken');
var config = require('../config/auth.js');
var db = require("../models");

// Helper functions
// =============================================================
function verifyPassword(user, password) {
  if (user.pass === password) {
    console.log("Password was correct.");
    return true;
  } else {
    console.log(JSON.stringify(user));
    console.log("Password was incorrect.");
    return false;
  }
}

// Routes
// =============================================================
module.exports = function (app) {
  // Login route
  app.post('/login', function(req, res) {
    db.User.findOne({ where: { username: req.body.username }}).then(function(user) {
      console.log(JSON.stringify(user));
      if (!user) {
        res.send({ success: false, message: 'Authentication failed. User not found.' });
      } else if (!verifyPassword(user, req.body.password)) {
        res.send({ success: false, message: 'Authentication failed. Passwords did not match.' });
      } else {
        var token = jwt.sign({user_id: user.id, username: user.username}, config.jwtSecret, {
          expiresIn: 10080 // in seconds
        });
        res.json({ success: true, token: 'JWT ' + token });
      }
    });
  });
};
