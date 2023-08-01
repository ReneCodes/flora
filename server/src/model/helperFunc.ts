import axios from 'axios';
const fs = require('fs');
// secret variables
const {PLANT_ID} = require('../config');

exports.dateString = () => {
	return new Date().toLocaleDateString(undefined, {month: 'short', day: '2-digit', year: 'numeric'});
};

/* IDENT PREPARATION */
exports.prepareIdentBody = (base64dataURL: string) => {
	return {
		api_key: PLANT_ID,
		/* modifiers*/
		modifiers: ['crops_fast'],
		/* response language for common name and wiki text */
		// TODO: get user preference language from device
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
// TODO: remove temp data for production
exports.cleanPlantData = async (identResult: IdentResult) => {
	const plant = identResult ? identResult : require('./Temp/searchResult.example.two.js'); // for mock data reason
	// const plant = identResult ? identResult : require('./Temp/searchResult.example.one'); // for mock data reason
	const scientificNames:string[] = [];
	const wikiPlantData = [];
	let temp_idx = 0;

	plant.uploaded_datetime = new Date();
	// DELETE not needed keys
	plant['_id'] = plant.id;
	deleteKeys(plant);

	let {suggestions} = plant;

	// Exclude found plants below 10% BUT keep at least one
	// TODO: outsource function
	suggestions.forEach((plant:Plant, idx:number) => {
		if (plant.probability! < 0.1 && !temp_idx) temp_idx = idx;
	});
	if (temp_idx) suggestions.splice(temp_idx); // delete everything after idx position

	cleanSuggestions(suggestions, scientificNames);

	// Fetch up-to-date Wiki data
	for (let i = 0; i < scientificNames.length; i++) {
		scientificNames[i].split(' ').join('_');
		const getWiki = await wikiSummary(scientificNames[i]);
		wikiPlantData.push(getWiki);
	}

	// TODO: Fetch More Wiki mobile Data	=> // TODO: Strip out HTML tags => https://en.wikipedia.org/api/rest_v1/#/Mobile/getSectionsRemaining

	updateSuggestions(suggestions, wikiPlantData);

	return plant;
};

// FOR CLEAN DATA
function deleteKeys(plant:Plant) {
	const keyList = ['id', 'custom_id', 'meta_data', 'finished_datetime', 'modifiers', 'secret'];
//until I am sure it wasn't necessary, just making a note this function originally returned
// this before a refactor.
	// return keyList.forEach((key: keyof Plant) => {
	// 	delete plant[key];
	for(const key of keyList) {
		delete plant[key as keyof Plant];
	};
}

// FOR CLEAN DATA
function cleanSuggestions(suggestions:Plant[], scientificNames:string[]) {
	suggestions.map((plant) => {
		delete plant.confirmed;

		const {plant_details} = plant;
		const {common_names, synonyms, scientific_name} = plant_details;

		if (common_names && common_names.length > 5) common_names.splice(5);
		if (synonyms && synonyms.length > 5) synonyms.splice(5);
		scientificNames.push(scientific_name);
	});
}

// FOR CLEAN DATA //  TODO: include user pref language option
const wikiSummary = async (plant_name:string, lang = 'en') => {
	const url = `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${plant_name}`;

	try {
		const response = await axios.get<{
			description: string,
			extract: string,
			originalimage: { source: string},
			content_urls: {mobile : any}
		}>(url)
		const {
			description,
			extract,
			originalimage,
			content_urls,
		} = response.data
		// .then((response) => {
		// 	const {description, extract, originalimage, content_urls} = response.data;

		return {
			description,
			extract,
			url: content_urls.mobile.page,
			originalimage: originalimage.source,
		};
	} catch(err) {
		console.error(`Error fetching wiki summary for ${plant_name}:`, err);
    return {
      description: '',
      extract: '',
      url: '',
      originalimage: '',
    }
	}
};

// FOR CLEAN DATA
function updateSuggestions(suggestions:Plant[], wikiPlantData:WikiPlantData[]) {
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
