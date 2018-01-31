// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function (app) {

    // Each of the below routes just handles the HTML page that the user gets sent to.

    // index route loads about.html
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/about.html"));
    });

    // login route loads login.html
    app.get("/login", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/login.html"));
    });

    // main route loads main.html
    app.get("/main", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/main.html"));
    });

    // signup route loads signup.html
    app.get("/signup", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/signup.html"));
    });

    // profile route leads to profile.html
    app.get("/profile*", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/profile.html"));
    });

    app.get("/create", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/create.html"));
    });
    // debate route leads to debate.html
    app.get("/debate*", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/debate.html"));
    });

    // logout route leads to logout.html
    app.get("/logout", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/logout.html"));
    });

    app.get("/test", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/test.html"));
    });
};
