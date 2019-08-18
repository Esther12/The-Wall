//Dependencies
//=============================================================
var cookieParser = require("cookie-parser");
var session = require("express-session");
var morgan = require("morgan");
var hbs = require("express-handlebars");
var bodyParser = require("body-parser");
var express = require("express");
var path = require("path");

//Sets up the express bar
//=============================================================
var app = express();
var PORT = process.env.PORT || 8080;


// Requiring data models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan ('dev'));
app.use(cookieParser);
app.use(session({
    key: "user_sid",
    secret:"somesecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }

}));


app.engine("handlebars", hbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use((req, res, next) => {
    if(req.cookies.user_sid && !req.session.user){
        res.clearCookie('user_sid');
    }
    next();
});


// Static directory
//app.use(express.static("public"));

// Routes
// =============================================================
// require("./routes/api-routes.js")(app);
 require("./routes/html-routes.js")(app);

var hbsContent = {username:'', loggedin:false, title: "your are not logged in", body:"Hello world"};

var sessionChecker = (req, res, next) => {
    if(req.session.user && req.cookies.user_sid){
        res.redirect('/dashboard');
    }else{
        next();
    }
};

//Route for home page
app.get('/', sessionChecker, (req, res) => {
    res.redirect("/login");
});

//Route for signup page
app.route("/signup")
    .get((req, res) => {
        //res.sendFile(__dirname + "/public/signup.html");
        res.render('signup', hbsContent);
    })
    .post((req, res) => {
        db.create({
            username: req.body.username,
            password: req.body.password
        }).then(db => {
            req.session.user = user.dataValues;
            res.redirect('./dashboard');
        }).catch(error =>{
            res.redirect('/signup');
        });
    });
// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });