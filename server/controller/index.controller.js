const Plant = require('../model/Garden.model');

const identifyPlant = async (req, res) => {
	try {
		res.status(200).send('indentification in progress');
	} catch (error) {
		res.status(500);
		res.send('Error during identification', error);
	}
};

const getGarden = async (req, res) => {
	try {
		res.status(200).send('Hello from Garden');
	} catch (error) {
		res.status(500);
		res.send('Error finding garden', error);
	}
};

const savePlantToGarden = async (req, res) => {
	const plant = {
		plant_name: req.body.name,
		date: Date.now(),
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
	const id = req.params.id;
	try {
		res.status(201).send(`plant ${id} visited`);
	} catch (error) {
		res.status(400);
		res.send(`Error locating plant: ${error}`);
	}
};

const removePlant = async (req, res) => {
	const id = req.params.id;
	try {
		res.status(200).send(`Plant ${id} Removed`);
	} catch (error) {
		res.status(400);
		res.send(`Error removing plant: ${error}`);
	}
};

module.exports = {identifyPlant, getGarden, savePlantToGarden, updatePlant, removePlant};
