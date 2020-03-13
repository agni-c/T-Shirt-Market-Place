const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
			maxlength: 32
		},
		description: {
			type: String,
			trim: true,
			required: true,
			maxlength: 2000
		},
		price: {
			type: Number,
			required: true,
			maxlength: 32,
			trim: true
		},
		category: {
			//Relation with another model
			type: ObjectId,
			ref: 'Category',
			required: true
		},
		stock: {
			type: Number
		},
		sold: {
			type: Number,
			default: 0
		},
		photo: {
			data: Buffer, //// binData will be cast to a Buffer
			contentType: String
		}
	},
	{ timestamps: true } //keeps track of the instance updates
);

module.exports = mongoose.model('Product', productSchema);
