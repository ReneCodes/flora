const Plant = require('../model/Plant.model');

const identifyPlant = async (req, res) => {
	try {
		res.status(200).send('indentification in progress');
	} catch (error) {
		res.status(500);
		res.send({'Error during identification': error});
	}
};

const getGarden = async (req, res) => {
	try {
		const plants = await Plant.find();
		res.status(200).send({'Hello from Garden': plants});
	} catch (error) {
		res.status(500);
		res.send({'Error finding garden': error});
	}
};

const savePlantToGarden = async (req, res) => {
	const plant = {
		plant_name: req.body.name,
		date: Date.now(),
		note: req.body.note,
	};
	console.log(plant);
	try {
		await Plant.create(plant);
		res.status(201).send('planted in Garden');
	} catch (error) {
		res.status(400);
		res.send(`Error planting plant: ${error}`);
	}
};

const updatePlant = async (req, res) => {
	const {_id, note} = req.body;
	try {
		const plant = await Plant.findByIdAndUpdate(_id, {note});
		res.status(201).send(`plant ${plant} visited`);
	} catch (error) {
		res.status(400);
		res.send(`Error locating plant: ${error}`);
	}
};

const removePlant = async (req, res) => {
	const {_id} = req.body;
	try {
		res.status(200).send(`Plant ${_id} Removed`);
	} catch (error) {
		res.status(400);
		res.send(`Error removing plant: ${error}`);
	}
};

module.exports = {identifyPlant, getGarden, savePlantToGarden, updatePlant, removePlant};
