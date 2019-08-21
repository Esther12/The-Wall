// Dependencies
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");
// Routes
// =============================================================
module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the game page
    if (req.user) {
      res.redirect("/game");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the game page
    if (req.user) {
      res.redirect("/game");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });
  app.get("/register", function(req, res) {
    // If the user already has an account send them to the login page
    if (req.user) {
      res.redirect("/login");
    }
    res.sendFile(path.join(__dirname, "../public/register.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/game", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/game.html"));
  });

};