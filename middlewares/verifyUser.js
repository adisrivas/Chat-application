const decoded = require('../middlewares/userAuth').decodeToken;
const UserController = require('../controllers/UserController'); 
const verifyAuth = (req,res,next) => {
    try {
        const userToken = req.userToken;
        const decodedToken = decoded(userToken);
        const userDBInfo = UserController.getUserDB(decodedToken.username);

    } catch {}
}