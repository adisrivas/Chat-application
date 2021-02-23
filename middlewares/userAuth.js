require('dotenv').config();
const jwt = require('jsonwebtoken');
const secretToken = process.env.secretToken;
const token = (userDetails) => {
    jwt.sign(userDetails, secretToken);
};

const decoded = (receivedToken) => {
    jwt.verify(receivedToken, secretToken);
};

module.exports = {
    createToken: token,
    decodeToken: decoded
}