const router = require('express').Router();
const { getProductId } = require('../controller/product');
const { isAdmin, isAuthenticated, isSignedIn } = require('../controller/auth');
const { getUserById } = require('../controller/user');
const { getCategory } = require('../controller/category');

//Params extractor
router.param('productId', getProductId);
router.param('userId', getUserById);

//routes

module.exports = router;
