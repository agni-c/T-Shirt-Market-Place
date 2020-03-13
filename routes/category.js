const router = require('express').Router();

const {
	getCategoryById,
	createCategory,
	getAllCategory,
	getCategory,
	updateCategory,
	removeCategory
} = require('../controller/category');
const { isAdmin, isAuthenticated, isSignedIn } = require('../controller/auth');
const { getUserById } = require('../controller/user');

//Params Extractor
router.param('userId', getUserById);
router.param('categoryId', getCategoryById);

//Routes

//Create
router.post(
	'/category/create/:userId',
	isSignedIn,
	isAuthenticated,
	isAdmin,
	createCategory
);

//Read
router.get('/category/:categoryId', getCategory);
router.get('/categories', getAllCategory);

//Update
router.post(
	'/category/:categoryId/:userId',
	isSignedIn,
	isAuthenticated,
	isAdmin,
	updateCategory
);

//Delete
router.delete(
	'/category/:categoryId/:userId',
	isSignedIn,
	isAuthenticated,
	isAdmin,
	removeCategory
);
module.exports = router;
