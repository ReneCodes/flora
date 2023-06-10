const axios = require('axios');
const Plant = require('../model/Plant.model');
const helper = require('../model/helperFunc'); // TODO: Maybe rename to Ident.service

exports.identifyPlant = async (req, res) => {
	const {dataURL} = req.body;
	console.log(dataURL);
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
		res.status(417);
		console.log(error);
		res.send({result: 'Error during identification', error});
	}
};

exports.getGarden = async (req, res) => {
	try {
		const plants = await Plant.find();
		res.status(200).send(plants);
	} catch (error) {
		res.status(503);
		res.send({result: 'Error finding garden', error});
	}
};

exports.savePlantToGarden = async (req, res) => {
	const plant = {
		...req.body,
	};
	try {
		await Plant.create(plant);
		res.status(201).send({result: 'planted in Garden'});
	} catch (error) {
		res.status(503);
		res.send({result: 'Error planting plant', error});
	}
};

exports.updatePlant = async (req, res) => {
	const {_id} = req.body;
	try {
		const plant = await Plant.findByIdAndUpdate(_id, req.body, {new: true}); // new:true => returns updated plant
		res.status(201).send({result: `plant ${plant._id} visited`, plant});
	} catch (error) {
		res.status(417);
		res.send({result: 'Error locating plant', error});
	}
};

exports.removePlant = async (req, res) => {
	const {_id} = req.body;
	try {
		const plant = await Plant.findByIdAndDelete(_id); // returns updated plant
		res.status(200).send({result: `Plant ${plant._id} Removed`});
	} catch (error) {
		console.log(error);
		res.status(417);
		res.send({result: `Error removing plant`, error});
	}
};
