const router = require('express').Router();
const {
	getProductId,
	createProduct,
	photo,
	getProduct
} = require('../controller/product');
const { isAdmin, isAuthenticated, isSignedIn } = require('../controller/auth');
const { getUserById } = require('../controller/user');
const { getCategory } = require('../controller/category');

//Params extractor
router.param('productId', getProductId);
router.param('userId', getUserById);

//routes
router.post('/product/create/:userId', isAdmin, isSignedIn, createProduct);
router.get('/product/:productId', getProduct);
router.get('/product/photo/:productId', photo);
module.exports = router;
