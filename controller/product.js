const Product = require('../model/product');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

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

exports.createProduct = (req, res) => {
	let form = formidable.IncomingForm(); //creates a form object
	form.keepExtension = true;

	form.parse(req, (err, fields, file) => {
		if (err) {
			return res.status(400).json({
				error: 'problem with image'
			});
		}
		//destructuring the fields
		const { name, description, category, price, stock } = fields;

		if (!name || !description || !category || !price || !stock) {
			return res.status(400).json({
				error: 'Please include all fields'
			});
		}
		//TODO restriction on field
		let product = new Product(fields);

		//handle file here
		if (file.photo) {
			if (file.photo.size > 3000000) {
				return res.status(400).json({
					error: 'File size too big'
				});
			}
			product.photo.data = fs.readFileSync(file.photo.path);
			product.photo.contentType = file.photo.type;
		}
		//save to the DB
		product.save((err, product) => {
			if (err) {
				res.status(400).json({
					error: ' Saving tshirt failed'
				});
			}
			res.json(product);
		});
	});
};

exports.getProduct = (req, res) => {
	req.product.photo = undefined;
	return res.json(req.product);
};

//middleWare
exports.photo = (req, res, next) => {
	if (req.product.photo.data) {
		res.set('Content-Type', req.product.photo);
		return res.send(req.product.photo.data);
	}
	next();
};
