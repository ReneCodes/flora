const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
	plant_name: {
		type: String,
		required: [true, 'Plant Name is missing?'],
	},
	personal_name: String,
	uploaded_datetime: {
		type: Date,
		default: Date.now(),
		required: [true, 'Date is missing?'],
	},
	images: [
		{
			file_name: String,
			url: String,
		},
	],
	plant_details: {
		common_names: [String],
		url: String,
		wiki_description: {
			value: String,
			extract: String,
		},
		taxonomy: {
			class: String,
			family: String,
			genus: String,
			kingdom: String,
			order: String,
			phylum: String,
		},
		wiki_image: String,
		synonyms: [String],
		gbif_id: String,
		edible_parts: mongoose.Mixed,
		propagation_methods: mongoose.Mixed,
		watering: {
			max: Number,
			min: Number,
		},
		watering_info: String,
		language: String,
		scientific_name: String,
		structured_name: {
			genus: String,
			species: String,
		},
	},
	note: String,
	api_id: String,
});

const Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;
