const User = require('../model/user');
const Order = require('../model/order');
//Creating middleware with params accessability
//Finding user by its id
exports.getUserById = (req, res, next, id) => {
	User.findById(id).exec((err, user) => {
		//check if user exist in database
		if (!user || err) {
			res.status(400).json({
				error: 'No user found'
			});
		}
		//If user found ,store it in req object
		req.profile = user;
		next();
	});
};
exports.getUser = (req, res) => {
	//Hiding irrelivent things from user
	req.profile.salt = undefined;
	req.profile.hash_password = undefined;
	req.profile.createdAt = undefined;
	req.profile.updatedAt = undefined;
	req.profile.__v = undefined;
	//sending the profile
	return res.json(req.profile);
};

exports.updateUser = (req, res) => {
	User.findByIdAndUpdate(
		{ _id: req.profile._id },
		{ $set: req.body },
		{ new: true, useFindAndModify: false },
		(err, user) => {
			if (err) {
				res.status(400).json({ Error: 'Not authorized' });
			}
			//Data hiding
			user.salt = undefined;
			user.hash_password = undefined;
			user.createdAt = undefined;
			user.updatedAt = undefined;
			user.__v = undefined;

			res.json(user);
		}
	);
};

exports.userPerchaseList = (req, res) => {
	Order.find({ user: req.profile._id })
		.populate('user', '_id name')
		.exec((err, order) => {
			if (err) {
				return res.json(400).json({
					error: 'No order'
				});
			}
			res.send(order);
		});
};

exports.pushOrdersInPurchaseList = (req, res, next) => {
	let purchases = [];
	req.body.order.products.forEach(product => {
		purchases.push({
			_id: product._id,
			name: product.name,
			description: product.description,
			quantity: product.quantity,
			amount: req.body.order.amount,
			transaction_id: req.body.order.transaction_id
		});

		//storing in database
		User.findOneAndUpdate(
			{ _id: req.profile._id },
			{ $push: { purchases: purchases } },
			{ new: true },
			(err, purchases) => {
				if (err) {
					return res.status(400).json({
						error: 'Unable to save the list'
					});
				}
			}
		);
		next();
	});
};
