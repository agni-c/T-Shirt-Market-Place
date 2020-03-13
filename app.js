const cors = require('cors');
const cookieParse = require('cookie-parser');

//initlizing the express frame work
const express = require('express');
const app = express();
const port = 8000 || process.env.PORT;

//Environment var config
require('dotenv').config();

//DB connection
const mongoose = require('mongoose');
mongoose
	.connect(process.env.DATABASE, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log(`DB connected`);
	})
	.catch('DB error');

//MiddleWares
app.use(express.json());
app.use(cors());
app.use(cookieParse());

//Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);

//Listening
app.listen(port, () => {
	console.log(`Running at ${port}`);
});
