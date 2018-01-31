var passport = require('passport');
var bcrypt = require('bcrypt');
var db = require("../models");
const { UniqueConstraintError } = require('sequelize/lib/errors')

module.exports = function(app) {
  // Find all Users and return them to the user with res.json
  // Replace with commented line to enable authentication for the route
  app.get("/api/users", function(req, res) {
  //app.get("/api/users", passport.authenticate('jwt', { session: false }), function(req, res) {
    db.User.findAll({}).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // Replace with commented line to enable authentication for the route
  app.get("/api/users/:id", function(req, res) {
  //app.get("/api/users/:id", passport.authenticate('jwt', { session: false }), function(req, res) {
     // Find one User with the id in req.params.id and return them to the user with res.json
    db.User.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
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
          res.status(200).json(newDbUser);
        });
      }
    });
  });
  

  app.delete("/api/users/:id", function(req, res) {
  //app.delete("/api/users/:id", passport.authenticate('jwt', { session: false }), function(req, res) {
    // Delete the User with the id available to us in req.params.id
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

};