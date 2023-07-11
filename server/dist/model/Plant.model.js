"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const mongoose = require('mongoose');
const mongoose_1 = __importDefault(require("mongoose"));
const plantSchema = new mongoose_1.default.Schema({
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
        edible_parts: mongoose_1.default.Schema.Types.Mixed,
        propagation_methods: mongoose_1.default.Schema.Types.Mixed,
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
const Plant = mongoose_1.default.model('Plant', plantSchema);
exports.default = Plant;
