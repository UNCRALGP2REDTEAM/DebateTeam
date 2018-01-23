// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {

    // GET route for getting all of the posts
    app.get("/api/comments", function (req, res) {
        var query = {};
        if (req.query.comment_id) {
            query.CommentId = req.query.comment_id;
        }
        // 1. Add a join here to include all of the Authors to these posts
        db.Comment.findAll({
            include: [db.User],
            where: query
        }).then(function (dbComment) {
            res.json(dbComment);
        });
    });

    // Get rotue for retrieving a single post
    app.get("/api/comments/:id", function (req, res) {
        // 2. Add a join here to include the Author who wrote the Post
        db.Comment.findOne({
            include: [db.User],
            where: {
                id: req.params.id
            }
        }).then(function (dbComment) {
            console.log(dbComment);
            res.json(dbComment);
        });
    });

    // POST route for saving a new post
    app.post("/api/comments", function (req, res) {
        db.Comment.create(req.body).then(function (dbComment) {
            res.json(dbComment);
        });
    });

    // DELETE route for deleting posts
    app.delete("/api/comments/:id", function (req, res) {
        db.Comment.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbComment) {
            res.json(dbComment);
        });
    });

    // PUT route for updating posts
    app.put("/api/comments", function (req, res) {
        db.Comment.update(
            req.body,
            {
                where: {
                    id: req.body.id
                }
            }).then(function (dbComment) {
                res.json(dbComment);
            });
    });
};