const express = require('express');
// const createToken = require('../middlewares/userAuth').createToken;
// const decodeToken = require('../middlewares/userAuth').decodeToken;
const app = express();

app.get('/user/:name', verifyUser, (req,res) => {
   //chat page
});

app.get('/signup', (req,res) => {
    res.render('signup');
})

app.post('/signup', (req,res) => {  
});

app.get('/login', (req,res) => {
    res.render('login');
});

app.post('/login', (req, res, next) => {
  });

app.get('/logout', (req,res) => {
    res.redirect('/login');
});
