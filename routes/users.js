const express = require('express');
const router = express.Router();
var db = require("../models");
const bcrypt = require("bcryptjs");
const passport = require('passport');
const bodyParser = require('body-parser') 



//User Login route
router.get('/login',(req, res)=> {
  res.render('users/login');
})
//User Register route
router.get('/register',(req, res)=> {
  res.render('users/register');
})

// //Register Form Post
router.post('/register',(req, res) =>{
  db.User.create(req.body).then(function(user){
    res.json(user);
  })
  
  // db.User.create({
  //   username: req.body.username,
  //   password: req.body.password
  // }).then((user)=> {
  //   res.redirect('users/login');
  // }).catch(error =>{
  //   res.redirect('/register')
  // });
  
  // console.log(req.body);
  // let errors = [];

  // if(req.body.password.length <4){
  //   errors.push({text: 'Password must be at least 4 characters'});
  // } 
  // if(errors.length > 0){
  //   res.render('/users/register')
  // }else{
  //   const newUser = new Users( {
  //     username: req.body.username,
  //     password: req.body.password
  //   })
  //   console.log(newUser);
  //   bcrypt.genSalt(10, (err, salt)=>{
  //     bcrypt.hash(newUser.password, salt, (err, hash) =>{
  //       if(err) throw err;
  //       newUser.password = hash;
  //       newUser.save()
  //         .then(user => {
  //           req.send('success login');
  //           res.redirect('users/login');
  //         })
  //         .catch(err =>{
  //           console.log(err);
  //           return;
  //         })
  //     })
  //   });
  // }

})

module.exports = router;