var passport = require('passport');
var db = require("../models");

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
  //app.post("/api/users", passport.authenticate('jwt', { session: false }), function(req, res) {
     // Create a User with the data available to us in req.body
    console.log(req.body);
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
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