const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const saltRounds = process.env.saltRounds;
const secretToken = process.env.secretToken;
const User = require('../models/userModel');

class UserController {
    static async getUserDB(username) {
        User.findOne({username}, (err, found) => {
            if(err) {
                return null;
            } else {
                return found;
            }
        })
    }
    static async loginUser(req, res) {
        const userDetails = req.body;
        User.findOne({username: userDetails.username}, (err, found) => {
            if(err) {
                console.log('User not found');
                res.redirect('/signup');
            } else {
                const isTrue = bcrypt.compareSync(userDetails.password, found.password);
                if(isTrue) {
                    const createToken = jwt.sign({username: found.username}, secretToken);
                    req.userToken = createToken;
                    res.redirect('/user/'+found.username);
                } else {
                    console.log('Wrong password entered');
                    res.redirect('/login');
                }
            }
        });
    }

    static async logoutUser(req, res) {
        req.userToken = null;
        res.redirect('/login');
    }

    static async signupUser(req, res) {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const userDetails = {
            username: req.body.username,
            password: hash
        }
        User.create(userDetails, (err, success) => {
            if(err) {
                console.log('Something went wrong');
            } else {
                res.send(success);
            }
        })
    }
}