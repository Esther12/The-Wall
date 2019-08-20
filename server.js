<<<<<<< HEAD
//Dependencies
//=============================================================
const express = require("express");
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser') 
const session = require('session');
const cookieParser = require('cookie-parser');
const path = require('path');

// Requiring data models for syncing
var db = require("./models");
const users = require('./routes/users');


//Sets up the express bar
//=============================================================
const app = express();
const PORT = process.env.PORT || 8080;

app.engine('handlebars', exphbs({defaultlayout: 'main'}));
app.set('view engine', 'handlebars');

//=================Router

//Index Route
app.get('/', (req, res) =>{
  const title= 'Welcome';
  res.render('index',{
    title: title
  });
})
//About Route
app.get('/about', (req, res) =>{
  res.render('about');
});

//About Ideas
app.get('/ideas/add', (req, res) =>{
  res.render('ideas/add');
});

//Process Form
app.post('/ideas',(req,res) =>{
  console.log(req.body)
  res.send('ok');
})




// Sets up the Express app to handle data parsing
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'public')));

//app.use(morgan ('tiny'));


//Route
//require("./routes/html-api-routes.js")(app);
app.use('/users', users);
=======
// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3030;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
require("./routes/htmlRoutes.js")(app);
require("./routes/apiRoutes.js")(app);
>>>>>>> d59757ffa0f3397527b720f2f6acba19c00bc734

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function() {
<<<<<<< HEAD
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });
=======
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
>>>>>>> d59757ffa0f3397527b720f2f6acba19c00bc734
