// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {

    // GET route for getting all of the posts
    app.get("/api/pages", function (req, res) {
    //app.get("/api/pages", passport.authenticate('jwt', { session: false }), function (req, res) {
        var query = {};
        if (req.query.user_id) {
            query.UserId = req.query.user_id;
        }
        // 1. Add a join here to include all of the Authors to these posts
        db.Page.findAll({
            include: [db.User],
            where: query
        }).then(function (dbPage) {
            res.json(dbPage);
        });
    });

    // Get rotue for retrieving a single post
    app.get("/api/pages/:id", function (req, res) {
    //app.get("/api/pages/:id", passport.authenticate('jwt', { session: false }), function (req, res) {
        // 2. Add a join here to include the Author who wrote the Post
        db.Page.findOne({
            include: [db.User],
            where: {
                id: req.params.id
            }
        }).then(function (dbPage) {
            console.log(dbPage);
            res.json(dbPage);
        });
    });

    // POST route for saving a new post
    app.post("/api/pages", function (req, res) {
    //app.post("/api/pages", passport.authenticate('jwt', { session: false }), function (req, res) {
        db.Page.create(req.body).then(function (dbPage) {
            res.json(dbPage);
        });
    });

    // DELETE route for deleting posts
    app.delete("/api/pages/:id", function (req, res) {
    //app.delete("/api/pages/:id", passport.authenticate('jwt', { session: false }), function (req, res) {
        db.Page.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbPage) {
            res.json(dbPage);
        });
    });

    // PUT route for updating posts
    app.put("/api/pages", function (req, res) {
    //app.put("/api/pages", passport.authenticate('jwt', { session: false }), function (req, res) {
        db.Page.update(
            req.body,
            {
                where: {
                    id: req.body.id
                }
            }).then(function (dbPage) {
                res.json(dbPage);
            });
    });
};
