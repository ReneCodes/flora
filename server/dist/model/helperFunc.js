"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const axios = require('axios');
const fs = require('fs');
// secret variables
const { PLANT_ID } = require('../config');
exports.dateString = () => {
    return new Date().toLocaleDateString(undefined, { month: 'short', day: '2-digit', year: 'numeric' });
};
/* IDENT PREPARATION */
exports.prepareIdentBody = (base64dataURL) => {
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
exports.cleanPlantData = (identResult) => __awaiter(void 0, void 0, void 0, function* () {
    const plant = identResult ? identResult : require('./Temp/searchResult.example.two.js'); // for mock data reason
    // const plant = identResult ? identResult : require('./Temp/searchResult.example.one'); // for mock data reason
    const scientificNames = [];
    const wikiPlantData = [];
    let temp_idx = 0;
    plant.uploaded_datetime = new Date();
    // DELETE not needed keys
    plant['_id'] = plant.id;
    deleteKeys(plant);
    let { suggestions } = plant;
    // Exclude found plants below 10% BUT keep at least one
    // TODO: outsource function
    suggestions.forEach((plant, idx) => {
        if (plant.probability < 0.1 && !temp_idx)
            temp_idx = idx;
    });
    if (temp_idx)
        suggestions.splice(temp_idx); // delete everything after idx position
    cleanSuggestions(suggestions, scientificNames);
    // Fetch up-to-date Wiki data
    for (let i = 0; i < scientificNames.length; i++) {
        scientificNames[i].split(' ').join('_');
        const getWiki = yield wikiSummary(scientificNames[i]);
        wikiPlantData.push(getWiki);
    }
    // TODO: Fetch More Wiki mobile Data	=> // TODO: Strip out HTML tags => https://en.wikipedia.org/api/rest_v1/#/Mobile/getSectionsRemaining
    updateSuggestions(suggestions, wikiPlantData);
    return plant;
});
// FOR CLEAN DATA
function deleteKeys(plant) {
    const keyList = ['id', 'custom_id', 'meta_data', 'finished_datetime', 'modifiers', 'secret'];
    return keyList.forEach((key) => {
        delete plant[key];
    });
}
// FOR CLEAN DATA
function cleanSuggestions(suggestions, scientificNames) {
    suggestions.map((plant) => {
        delete plant.confirmed;
        const { plant_details } = plant;
        const { common_names, synonyms, scientific_name } = plant_details;
        if (common_names && common_names.length > 5)
            common_names.splice(5);
        if (synonyms && synonyms.length > 5)
            synonyms.splice(5);
        scientificNames.push(scientific_name);
    });
}
// FOR CLEAN DATA //  TODO: include user pref language option
const wikiSummary = (plant_name, lang = 'en') => __awaiter(void 0, void 0, void 0, function* () {
    const url = `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${plant_name}`;
    return yield axios.get(url).then((response) => {
        const { description, extract, originalimage, content_urls } = response.data;
        return {
            description,
            extract,
            url: content_urls.mobile.page,
            originalimage: originalimage.source,
        };
    });
});
// FOR CLEAN DATA
function updateSuggestions(suggestions, wikiPlantData) {
    suggestions.forEach((plant, idx) => {
        const { description, extract, originalimage, url } = wikiPlantData[idx];
        const { plant_details } = plant;
        plant_details['wiki_description'] = {
            value: description,
            extract,
        };
        plant_details['wiki_image'] = originalimage;
        plant_details.url = url;
    });
}
