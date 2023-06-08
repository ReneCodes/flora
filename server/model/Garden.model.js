const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
	plant_name: {
		type: String,
		required: [true, 'Plant Name is missing?'],
	},
	date: {
		type: Date,
		required: [true, 'Date is missing?'],
	},
});

const Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;
