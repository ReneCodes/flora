var fs = require('fs');

const {PLANT_ID} = require('../config');

exports.dateString = () => {
	return new Date().toLocaleDateString(undefined, {month: 'short', day: '2-digit', year: 'numeric'});
};

exports.wikiSummary = async (plant_name) => {
	const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${plant_name}`;
	const result = await axios.get(url).then((response) => {
		// extract wiki summary here
		const {description, extract} = response.data;
		return {description, extract};
	});
	return result;
};

exports.imgToBase64 = (img_list) => {
	const IMG_ONE = __dirname + '/Temp/ansel-lee.jpg';
	const IMG_TWO = __dirname + '/Temp/jonathan-borba.jpg';
	const IMG_THREE = __dirname + '/Temp/julia-kuzenkov.jpg';

	const files = [img_list ? img_list : IMG_ONE];

	return files.map((file) => fs.readFileSync(file, 'base64'));
};

exports.prepareIdentBody = (base64files) => {
	return {
		api_key: PLANT_ID,
		/* modifiers*/
		modifiers: ['crops_fast', 'similar_images'],
		/* response language for common name and wiki text */
		// TODO: get user preverence language from device
		plant_language: 'en',
		/* expected plant details */
		plant_details: [
			'common_names',
			'edible_parts',
			'watering',
			'propagation_methods',
			'wiki_description',
			'name_authority',
			'synonyms',
			'taxonomy',
			'url',
			'wiki_image',
			'gbif_id',
			'plant_languages',
		],
		images: base64files,
	};
};
