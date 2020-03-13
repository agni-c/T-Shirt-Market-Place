const router = require('express').Router();
const {
	getUserById,
	getUser,
	updateUser,
	userPerchaseList
} = require('../controller/user');
const { isSignedIn, isAuthenticated, isAdmin } = require('../controller/auth');

//Any route with user id params will activate getUserByid method
router.param('userId', getUserById);

router.get('/user/:userId', isSignedIn, isAuthenticated, getUser);
router.put('/user/:userId', isSignedIn, isAuthenticated, updateUser);
router.get(
	'/orders/user/:userId',
	isSignedIn,
	isAuthenticated,
	userPerchaseList
);
module.exports = router;
