//Importing models
const User = require('../model/user');
const { check, validationResult } = require('express-validator');
const expressjwt = require('express-jwt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signup = (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res
			.status(422)
			.json({ error: errors.array()[0].msg, param: errors.array()[0].param });
	}
	//creating model instance
	const user = new User(req.body);
	user.save((err, user) => {
		if (err) {
			return res.status(400).json({ err: 'not able to save user' });
		}
		res.json(user);
	});
};

exports.signout = (req, res) => {
	res.clearCookie('token');
	res.json({
		message: 'User Signout successfully'
	});
};

exports.signin = (req, res) => {
	const { email, password } = req.body;

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res
			.status(422)
			.json({ error: errors.array()[0].msg, param: errors.array()[0].param });
	}

	User.findOne({ email }, (err, user) => {
		if (err || !user) {
			return res.status(400).json({ err: "User email doesn't exist" });
		}
		if (!user.authenticate(password)) {
			return res.status(400).json({
				err: 'Password and email dont match'
			});
		}
		//create token
		const token = jwt.sign({ _id: user._id }, process.env.SECRET);
		//Put token in cookie
		res.cookie('token', token, { expire: Date() + 9999 });

		//send response to the front end
		const { _id, name, email, role } = user;
		return res.json({ token, user: { _id, name, email, role } });
	});
};

//Protected routes
exports.isSignedIn = expressjwt({
	secret: process.env.SECRET,
	userProperty: 'auth'
});
//custom middleware
exports.isAuthenticated = (req, res, next) => {
	let checker = req.profile && req.auth && req.profile._id == req.auth._id;
	if (!checker) {
		return res.status(403).json({ error: 'ACCESS DENIED' });
	}
	next();
};

exports.isAdmin = (req, res, next) => {
	if (req.profile.role === 0) {
		return res.status(403).json({
			error: 'Not Admin , Access Denied'
		});
	}
	next();
};
