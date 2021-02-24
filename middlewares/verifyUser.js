const decoded = require('../middlewares/userAuth').decodeToken;
const UserController = require('../controllers/UserController'); 
const verifyUser = (req,res,next) => {
    try {
        const userToken = req.userToken;
        const decodedToken = decoded(userToken);
        const userDBInfo = UserController.getUserDB(decodedToken.username);
        if(userDBInfo === null) {
            res.send('Loggedin user cannot be authenticated');
        } else  {
            next();
        }
 
    } catch(err) {
        console.log('Something went wrong, moved to catch');
    }
}

module.exports = {
    verifyUser
};