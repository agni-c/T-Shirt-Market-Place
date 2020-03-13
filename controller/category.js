const Category = require('../model/category');

exports.getCategoryById = (req, res, next) => {
	Category.findById(id).exec((err, cate) => {
		if (err) {
			return res.status(400).json({
				error: 'Category not found'
			});
		}
		req.category = cate;
	});

	next();
};

exports.createCategory = (req, res) => {
	const category = new Category(req.body);
	category.save((err, category) => {
		if (err) {
			return res.status(400).json({
				error: 'not able to save category'
			});
		}
		res.json({ category });
	});
};

exports.getCategory = (req, res) => {
	return res.json(req.category);
};
exports.getAllCategory = (req, res) => {
	Category.find().exec((err, categories) => {
		if (err) {
			return res.status(400).json({
				error: 'NO categories found'
			});
		}
		res.json(categories);
	});
};

exports.updateCategory = (req, res) => {
	//
	const category = req.category;
	category.name = req.body.name;

	category.save((err, updateCategory) => {
		if (err) {
			return res.status(400).json({
				error: 'Category not updated'
			});
		}
		res.json(updateCategory);
	});
};

exports.removeCategory = (req, res) => {
	//
	const category = req.category;

	category.remove((err, category) => {
		if (err) {
			return res.status(400).json({
				error: 'failed to remove the category'
			});
		}
		res.json({
			message: 'successfully deleted',
			category: category.name
		});
	});
};
