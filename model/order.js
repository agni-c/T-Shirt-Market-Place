const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const ProductCartSchema = new mongoose.Schema({
	//Relaton -> Product with cart
	product: {
		type: ObjectId,
		ref: 'Product'
	},
	name: String,
	count: Number,
	price: Number
});

const OrderSchema = new mongoose.Schema(
	{
		//relation with productCart and Order
		products: [ProductCartSchema],
		transaction_id: {},
		amount: { type: Number },
		address: String,
		updated: Date,
		user: {
			type: ObjectId,
			ref: 'User'
		}
	},
	{ timestamps: true }
);

const Order = mongoose.model('Order', OrderSchema);
const ProductCart = mongoose.model('ProductCart', ProductCartSchema);

module.exports = { Order, ProductCart };
