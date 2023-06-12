import {savePlant} from './APIClient';

export const waterDrops = {
	1: ['💧', '10-14 days'],
	2: ['💧💧', '5-7 days'],
	3: ['💧💧💧', '2-3 days'],
};

export const cleanAndPushPlant = (suggestion, images) => {
	suggestion['note'] = '';
	suggestion['images'] = images;
	suggestion['personal_name'] = '';
	suggestion['api_id'] = suggestion['id'];
	delete suggestion['probability'];
	delete suggestion['id'];
	savePlant(suggestion); // send to BE
	return suggestion;
};
