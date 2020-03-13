const mongoose = require('mongoose');
const crypto = require('crypto');
const { v1: uuidv1 } = require('uuid');
//Creating a schema( a template for our data)
const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			maxlength: 32,
			trim: true //filter out the spaces
		},
		lastname: {
			type: String,
			maxlength: 32,
			trim: true
		},
		email: {
			type: String,
			trim: true,
			unique: true,
			required: true
		},
		userinfo: {
			type: String,
			trim: true
		},

		hash_password: {
			type: String,
			required: true
		},
		salt: String,
		role: {
			type: Number, //higher the number more privileges they have
			default: 0
		},
		purchases: {
			type: Array,
			default: []
		}
	},
	{ timestamps: true }
);

//vartuals from mongoose docs
// virtual is a property that is not stored in MongoDB. Virtuals are typically used for computed properties on documents.
userSchema
	.virtual('password')
	.set(function(password) {
		this._password = password; // underscored(_) variables are used for making private variables
		this.salt = uuidv1(); //using unique id to gen salt
		this.hash_password = this.securePassword(password);
	})
	.get(function() {
		return this._password;
	});
//from mongoose docs
userSchema.methods = {
	authenticate: function(plainpassword) {
		return this.securePassword(plainpassword) === this.hash_password;
	},

	// from crypto docs
	securePassword: function(plainpassword) {
		if (!plainpassword) return ' ';
		try {
			return crypto
				.createHmac('sha256', this.salt)
				.update(plainpassword)
				.digest('hex');
		} catch (err) {
			return ' ';
		}
	}
};
//exporting a instance of a template
module.exports = mongoose.model('User', userSchema);
