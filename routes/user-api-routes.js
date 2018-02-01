var passport = require('passport');
var bcrypt = require('bcrypt');
var db = require("../models");
const { UniqueConstraintError } = require('sequelize/lib/errors')

module.exports = function(app) {
  // Find all Users and return them to the user with res.json
  app.get("/api/users", passport.authenticate('jwt', { session: false }), function(req, res) {
    console.log(JSON.stringify(req.user))
    // If the authenticated user is an admin, give them the full set of users.
    // Censor the password hashes.
    if (req.user.role === "ADMIN") {
      db.User.findAll({}).then(function(dbUser) {
        var userListRedacted = dbUser.map(userObj => {
          userObj.pass = null;
          return userObj;
        });
        res.json(userListRedacted);
      });
    } else {
      // If they're not an admin, only give them their own account, minus password hash.
      db.User.findOne({ where: { username: req.user.username }}).then(function(dbUser) {
        dbUser.pass = null;
        res.json(dbUser);
      });
    }
  });

  app.get("/api/users/:id", passport.authenticate('jwt', { session: false }), function(req, res) {
     // Find one User with the id in req.params.id and return them to the user with res.json
     db.User.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      // Only permit retrieval of an account's info if the authenticated
      // user is an admin, or if they're the account requested is theirs.
      // Censor the password hash.
      if (req.user.role === "ADMIN" || req.user.username === dbUser.username) {
        dbUser.pass = null;
        res.json(dbUser);
      } else {
        res.status(401).json({'error': "NOT_AUTHORIZED"});
      }
      
    });
  });

  app.post("/api/users", function(req, res) {
    // Create a User with the data available to us in req.body
    console.log(req.body);
    var passwordHash = bcrypt.hashSync(req.body.password, 12);
    var newUserObj = {
      username: req.body.username,
      pass: passwordHash
    };
    db.User.findOne({
      where: {
        username: newUserObj.username
      }
    }).then(function(existingDbUser) {
      if (existingDbUser) {
        res.status(409).json({ error: "USERNAME_EXISTS"});
      } else {
        db.User.create(newUserObj).then(function(newDbUser, err) {
          // Censor the password hash
          newDbUser.pass = null;
          res.status(200).json(newDbUser);
        });
      }
    });
  });
  

  app.delete("/api/users/:id", passport.authenticate('jwt', { session: false }), function(req, res) {
    // Delete the User with the id available to us in req.params.id
    // Only admins are allowed to delete accounts
    if (req.user.role === "ADMIN") {
      db.User.destroy({
        where: {
          id: req.params.id
        }
      }).then(function(dbUser) {
        res.json(dbUser);
      });
    } else {
      res.status(401).json({ error: "NOT_AUTHORIZED" });
    }
  });
};