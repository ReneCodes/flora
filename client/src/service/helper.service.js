import {savePlant} from './APIClient';

export const waterDrops = {
	1: ['💧', '10-14 days'],
	2: ['💧💧', '5-7 days'],
	3: ['💧💧💧', '2-3 days'],
};
export const wateringInfo = {
	1: `For this plant, ensure the soil dries out between watering to avoid stagnant water and root rot. Water once or twice during winter dormancy, and more frequently during active growth.`,
	2: `This plant is somewhat drought-tolerant, so don't worry if it dries out a bit. Brown fronds at the base indicate overwatering, while browning or wilting tips mean it needs more water.`,
	3: `Plants that need a lot of water also need excess water to run out somewhere. Always make sure that your plant is planted in a pot with holes.`,
};

export const cleanAndPushPlant = (suggestion, images) => {
	const {plant_details} = suggestion;
	let {watering} = plant_details;
	if (!watering) {
		delete plant_details['watering'];
		plant_details['watering'] = {
			max: 2,
			min: 2,
		};
	}
	plant_details['watering_info'] = wateringInfo[plant_details.watering.max];
	suggestion['note'] = '';
	suggestion['images'] = images;
	suggestion['personal_name'] = '';
	suggestion['api_id'] = suggestion['id'];
	delete suggestion['probability'];
	delete suggestion['id'];
	savePlant(suggestion); // send to BE
	return suggestion;
};
