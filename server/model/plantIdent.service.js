const axios = require('axios');
const fs = require('fs');
// secret variables
const {PLANT_ID} = require('../config');
const {identifyPlant} = require('../controller/index.controller');

exports.dateString = () => {
	return new Date().toLocaleDateString(undefined, {month: 'short', day: '2-digit', year: 'numeric'});
};

/* IDENT PREPARATION */
exports.prepareIdentBody = (base64dataURL) => {
	return {
		api_key: PLANT_ID,
		/* modifiers*/
		modifiers: ['crops_fast'],
		/* response language for common name and wiki text */
		plant_language: 'en',
		/* expected plant details */
		plant_details: [
			'common_names',
			'edible_parts',
			'watering',
			'propagation_methods',
			'wiki_description',
			'synonyms',
			'taxonomy',
			'url',
			'wiki_image',
			'gbif_id',
		],
		images: [base64dataURL],
	};
};

/* CLEAN DATA */
exports.cleanPlantData = async (identResult) => {
	const plant = identResult ? identResult : require('./Temp/searchResult.example.one');

	const scientificNames = [];
	const wikiPlantData = [];
	let temp_idx = 0;

	plant.uploaded_datetime = new Date();
	plant['_id'] = plant.id;

	deleteKeys(plant);

	let {suggestions} = plant;

	excludeLowMatches(suggestions, temp_idx);

	cleanSuggestions(suggestions, scientificNames);

	await getNewestWikiData(scientificNames, wikiPlantData);

	updateSuggestionsWiki(suggestions, wikiPlantData);

	return plant;
};

// DELETE not needed keys
function deleteKeys(plant) {
	const keyList = ['id', 'custom_id', 'meta_data', 'finished_datetime', 'modifiers', 'secret'];

	return keyList.forEach((key) => {
		delete plant[key];
	});
}

// Exclude found plants below 10%
// BUT keep at least one if all are below 10%
function excludeLowMatches(suggestions, temp_idx) {
	suggestions.forEach((plant, idx) => {
		if (plant.probability < 0.1 && !temp_idx) temp_idx = idx;
	});
	if (temp_idx) {
		suggestions.splice(temp_idx);
	} // delete everything after idx position
}

// Fetch up-to-date Wiki data
async function getNewestWikiData(scientificNames, wikiPlantData) {
	for (let i = 0; i < scientificNames.length; i++) {
		scientificNames[i].split(' ').join('_');
		const getWiki = await callWikiSummary(scientificNames[i]);
		wikiPlantData.push(getWiki);
	}
}

const callWikiSummary = async (plant_name, lang = 'en') => {
	const url = `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${plant_name}`;

	return await axios.get(url).then((response) => {
		const {description, extract, originalimage, content_urls} = response.data;

		return {
			description,
			extract,
			url: content_urls.mobile.page,
			originalimage: originalimage.source,
		};
	});
};

function cleanSuggestions(suggestions, scientificNames) {
	suggestions.map((plant) => {
		delete plant.confirmed;

		const {plant_details} = plant;
		const {common_names, synonyms, scientific_name} = plant_details;

		if (common_names && common_names.length > 5) common_names.splice(5);
		if (synonyms && synonyms.length > 5) synonyms.splice(5);
		scientificNames.push(scientific_name);
	});
}

function updateSuggestionsWiki(suggestions, wikiPlantData) {
	suggestions.forEach((plant, idx) => {
		const {description, extract, originalimage, url} = wikiPlantData[idx];
		const {plant_details} = plant;

		plant_details['wiki_description'] = {
			value: description,
			extract,
		};
		plant_details['wiki_image'] = originalimage;
		plant_details.url = url;
	});
}
