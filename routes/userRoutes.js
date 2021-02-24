const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const verifyUser = require('../middlewares/verifyUser');

router.get('/user/:name', verifyUser, UserController.userHomepage);
router.get('/signup', (req,res) => {
    res.render('signup');
});
router.post('/signup', UserController.signupUser);
router.get('/login', (req,res) => {
    res.render('login');
});
router.post('/login', UserController.loginUser);
router.get('/logout', UserController.logoutUser);

module.exports = router;