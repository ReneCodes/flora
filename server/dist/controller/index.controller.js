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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Plant_model_1 = __importDefault(require("../model/Plant.model"));
const axios = require('axios');
// const Plant = require('../model/Plant.model');
const helper = require('../model/helperFunc'); // TODO: Maybe rename to Ident.service
// // TODO: Uncomment for real API Identification => very limited API calls
// // HOT WIRE START
exports.identifyPlant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dataURL } = req.body;
    try {
        const data = helper.prepareIdentBody(dataURL);
        const identResult = yield axios
            .post('https://api.plant.id/v2/identify', data)
            .then((res) => {
            console.log('Success:', res.data);
            return res.data;
        })
            .catch((error) => {
            console.error('Error: ', error);
        });
        /* Clean Data */
        const plantData = yield helper.cleanPlantData(identResult);
        res.status(200).send(plantData);
    }
    catch (error) {
        res.status(417);
        console.log(error);
        res.send({ result: 'Error during identification', error });
    }
});
// TODO: Uncomment for using Fake data as response
// COLD START
// exports.identifyPlant = async (req, res) => {
// 	try {
// 		const identResult = false; // for cold calls
// 		/* Clean Data */
// 		const plantData = await helper.cleanPlantData(identResult);
// 		res.status(200).send(plantData);
// 	} catch (error) {
// 		res.status(417);
// 		console.log(error);
// 		res.send({result: 'Error during identification', error});
// 	}
// };
exports.getGarden = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const plants = yield Plant_model_1.default.find();
        res.status(200).send(plants);
    }
    catch (error) {
        res.status(503);
        res.send({ result: 'Error finding garden', error });
    }
});
exports.savePlantToGarden = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const plant = Object.assign({}, req.body);
    console.log(plant);
    try {
        yield Plant_model_1.default.create(plant);
        res.status(201).send({ result: 'planted in Garden' });
    }
    catch (error) {
        res.status(503);
        res.send({ result: 'Error planting plant', error });
    }
});
function getIdField(body) {
    const { _id, api_id } = body;
    if (_id)
        return { _id };
    else
        return { api_id };
}
exports.updatePlant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const plant = yield Plant_model_1.default.findOneAndUpdate(getIdField(req.body), req.body, { new: true }); // new:true => returns updated plant
        res.status(201).send({ result: `plant ${plant === null || plant === void 0 ? void 0 : plant._id} visited`, plant });
    }
    catch (error) {
        res.status(417);
        res.send({ result: 'Error locating plant', error });
    }
});
exports.removePlant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const {_id} = req.body;
    try {
        const plant = yield Plant_model_1.default.findOneAndRemove(getIdField(req.body)); // returns removed plant
        res.status(200).send({ result: `Plant ${plant === null || plant === void 0 ? void 0 : plant._id} Removed` });
    }
    catch (error) {
        console.log(error);
        res.status(417);
        res.send({ result: `Error removing plant`, error });
    }
});
