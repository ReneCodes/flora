const axios = require('axios');
const Plant = require('../model/Plant.model');
const helper = require('../model/helperFunc'); // TODO: Maybe rename to Ident.service

exports.identifyPlant = async (req, res) => {
	try {
		/* Turn image(s) to base64 string */
		const base64ImgList = helper.imgToBase64(/* TODO: INSERT_IMAGE_ARRAY_HERE */);
		const data = helper.prepareIdentBody(base64ImgList);

		// FIXME: Get base64 String from FE
		// TODO: Uncomment for real API Identification
		/* Identify image(s) */
		// const identResult = await axios
		// 	.post('https://api.plant.id/v2/identify', data)
		// 	.then((res) => {
		// 		console.log('Success:', res.data);
		// 		return res.data;
		// 	})
		// 	.catch((error) => {
		// 		console.error('Error: ', error);
		// 	});

		/* Clean Data */
		const tempData = await helper.cleanPlantData(/* TODO: INSERT_API_RESPONSE_HERE */);

		res.status(200).send(tempData);
	} catch (error) {
		res.status(500);
		console.log(error);
		res.send({'Error during identification': error});
	}
};

exports.getGarden = async (req, res) => {
	try {
		const plants = await Plant.find();
		res.status(200).send({'Hello from Garden': plants});
	} catch (error) {
		res.status(500);
		res.send({'Error finding garden': error});
	}
};

exports.savePlantToGarden = async (req, res) => {
	const plant = {
		...req.body,
	};
	try {
		await Plant.create(plant);
		res.status(201).send('planted in Garden');
	} catch (error) {
		res.status(400);
		res.send(`Error planting plant: ${error}`);
	}
};

exports.updatePlant = async (req, res) => {
	const {_id, note} = req.body;
	try {
		const plant = await Plant.findByIdAndUpdate(_id, {note}, {new: true}); // returns updated plant
		res.status(201).send(`plant ${plant} visited`);
	} catch (error) {
		res.status(400);
		res.send(`Error locating plant: ${error}`);
	}
};

exports.removePlant = async (req, res) => {
	const {_id} = req.body;
	try {
		const plant = await Plant.findByIdAndDelete(_id); // returns updated plant
		res.status(200).send(`Plant ${plant} Removed`);
	} catch (error) {
		res.status(400);
		res.send(`Error removing plant: ${error}`);
	}
};
