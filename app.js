const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.set(express.static('public'));

let userDetails = require('./public/models/userSchema.js');
let tempUsername;
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

require('dotenv').config()

mongoose.connect('mongodb://localhost/LetsChatDB',
  { useNewUrlParser: true, useUnifiedTopology: true });

let connections = [];

app.get('/user/:name', connectEnsureLogin.ensureLoggedIn('/login'),
(req,res) => {
    tempUsername = req.params.name;
    res.render('index', {username: req.params.name, connections: connections}); //chat page
});

app.get('/signup', (req,res) => {
    res.render('signup');
})

app.post('/signup', (req,res) => {
    let newUser = new userDetails({username: req.body.username});
    userDetails.register(newUser, req.body.password, (err,user) => {
        if(err) {
            throw err;
        } else {
            res.redirect('/login');
        }
    });  
});

app.get('/login', (req,res) => {
    res.render('login');
});

app.post('/login', (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.send('User not found!');
      }
      req.login(user, function(err) {
        if (err) {
          return next(err);
        }
        res.redirect('/user/'+user.username);
      });
  
    })(req, res, next);
  });

app.get('/logout', (req,res) => {
    req.logout();
    res.redirect('/login');
})

io.on('connection', (socket) => {
    let currentUser = {
        username: tempUsername,
        id: socket.id
    };

    connections.push(currentUser);
    console.log('Connected socket username: %s, ID: %s', currentUser.username, currentUser.id);
    console.log('Total sockets connected: %s', connections.length);
    socket.on('private-msg', (data) => {
        console.log('ID: %s, username: %s, msg: %s',data.id,data.username,data.msg);
        socket.to(data.id).emit('deliver', {username: data.username, msg: data.msg});
    });

    socket.on('disconnect', () => {
        for(let i =0; i<connections.length; i++) {
            if(connections[i].id == socket.id) {
                connections.splice(i,1);
            }
        }
        console.log('Disconnected. Connected Sockets: %s', connections.length);
    });
});
server.listen(8080, () => {
    console.log('Server Started');
})