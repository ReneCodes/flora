const axios = require('axios');
const Plant = require('../model/Plant.model');
const helper = require('../model/helperFunc'); // TODO: Maybe rename to Ident.service

exports.identifyPlant = async (req, res) => {
	const {dataURL} = req.body;
	// console.log(dataURL);
	// console.log('Identify Plant:', dataURL);
	try {
		// TODO: Uncomment for real API Identification => very limited API calls
		// // Identify image(s)

		// const data = helper.prepareIdentBody(dataURL);
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
		// TODO: uncomment parameter
		const plantData = await helper.cleanPlantData(/*identResult*/);

		res.status(200).send(plantData);
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

// needed when updating a plant directly after Snapshot
// reason => _id does not exist yet
function getIdField(body) {
	const {_id, api_id} = body;
	if (_id) return {_id};
	else return {api_id};
}

exports.updatePlant = async (req, res) => {
	try {
		const plant = await Plant.findOneAndUpdate(getIdField(req.body), req.body, {new: true}); // new:true => returns updated plant
		res.status(201).send({result: `plant ${plant._id} visited`, plant});
	} catch (error) {
		res.status(417);
		res.send({result: 'Error locating plant', error});
	}
};

exports.removePlant = async (req, res) => {
	// const {_id} = req.body;
	try {
		const plant = await Plant.findOneAndRemove(getIdField(req.body)); // returns removed plant
		res.status(200).send({result: `Plant ${plant._id} Removed`});
	} catch (error) {
		console.log(error);
		res.status(417);
		res.send({result: `Error removing plant`, error});
	}
};
