import { AxiosResponse } from "axios";
import { Request, Response } from 'express'
import Plant from '../model/Plant.model'

const axios = require('axios');
// const Plant = require('../model/Plant.model');
const helper = require('../model/helperFunc'); // TODO: Maybe rename to Ident.service

// // TODO: Uncomment for real API Identification => very limited API calls
// // HOT WIRE START
exports.identifyPlant = async (req: Request, res: Response): Promise<void> => {
	const { dataURL } = req.body;

	try {
		const data = helper.prepareIdentBody(dataURL);
		const identResult = await axios
			.post('https://api.plant.id/v2/identify', data)
			.then((res: AxiosResponse) => {
				console.log('Success:', res.data);
				return res.data;
			})
			.catch((error: Error) => {
				console.error('Error: ', error);
			});

		/* Clean Data */
		const plantData = await helper.cleanPlantData(identResult);

		res.status(200).send(plantData);
	} catch (error) {
		res.status(417);
		console.log(error);
		res.send({ result: 'Error during identification', error });
	}
};

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

exports.getGarden = async (req: Request, res: Response) => {
	try {
		const plants = await Plant.find();
		res.status(200).send(plants);
	} catch (error) {
		res.status(503);
		res.send({ result: 'Error finding garden', error });
	}
};

exports.savePlantToGarden = async (req: Request, res: Response) => {
	const plant = {
		...req.body,
	};
	try {
		const newplant = await Plant.create(plant);
		res.status(201).send({ result: 'planted in Garden', plant: newplant });
	} catch (error) {
		res.status(503);
		res.send({ result: 'Error planting plant', error });
	}
};

// needed when updating a plant directly after Snapshot
// reason => _id does not exist yet

type BodyType = {
	_id?: string;
	api_id?: string;
};

function getIdField(body: BodyType) { //replace any with type
	const { _id, api_id } = body;
	if (_id) return { _id };
	else return { api_id };
}

exports.updatePlant = async (req: Request, res: Response) => {
	try {
		const plant = await Plant.findOneAndUpdate(getIdField(req.body), req.body, { new: true }); // new:true => returns updated plant
		res.status(201).send({ result: `plant ${plant?._id} visited`, plant });
	} catch (error) {
		res.status(417);
		res.send({ result: 'Error locating plant', error });
	}
};

exports.removePlant = async (req: Request, res: Response) => {
	// const {_id} = req.body;
	try {
		const plant = await Plant.findOneAndRemove(getIdField(req.body)); // returns removed plant
		res.status(200).send({ result: `Plant ${plant?._id} Removed` });
	} catch (error) {
		console.log(error);
		res.status(417);
		res.send({ result: `Error removing plant`, error });
	}
};
