const router = require('express').Router();
const { check, validationResult } = require('express-validator');
//Importing definitions form controller
const { signout, signup, signin, isSignedIn } = require('../controller/auth');

router.post(
	'/signup',
	[
		//express validation
		check('name', 'Name should least be 3 char long').isLength({ min: 3 }),
		check('email', 'Email required').isEmail(),
		check('password', 'Password should be at least 3 char').isLength({ min: 3 })
	],
	signup
);

router.post(
	'/signin',
	[
		//express validation
		check('email', 'Email required').isEmail(),
		check('password', 'Password Required').isLength({ min: 1 })
	],
	signin
);
router.get('/signout', signout);

router.get('/testroute', isSignedIn, (req, res) => {
	res.json(req.auth);
});

module.exports = router;
