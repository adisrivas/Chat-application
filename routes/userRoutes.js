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
});
