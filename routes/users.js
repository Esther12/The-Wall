const db = require("../models");
const passport = require("../config/passport");
var Id = 0;

module.exports = function (app) {
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
    Id = req.user.dataValues.id;
  });

  app.post("/api/register", function (req, res) {
    db.User.create({
      username: req.body.username,
      password: req.body.password
    })
      .then(function () {
        res.redirect("/api/login");
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  app.put("/api/game", function (req, res) {
    db.User.update(req.body, {
      where: {
        id: id
      }
    })
      .then(function () {
        res.json(req.user);
      })
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });


  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's username and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        username: req.user.username,
        id: req.user.id,
        score: req.user.score
      });
    }
  });

}