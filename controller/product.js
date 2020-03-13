const Product = require('../model/product');

exports.getProductId = (req, res, next, id) => {
	Product.findById(id)
		.populate('category')
		.exec((err, product) => {
			if (err) {
				res.status(400).json({
					message: 'ProductID not found'
				});
			}
			req.product = product;
			next();
		});
};
