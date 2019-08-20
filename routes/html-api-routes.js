// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  // cms route loads cms.html
  app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // blog route loads blog.html
  app.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  // authors route loads author-manager.html
  app.get("/dashboard", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/dashboard.html"));
  });

};