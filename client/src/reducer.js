import {combineReducers} from 'redux';
import plant1 from './service/TEMP/cleanPlant1';
import plant2 from './service/TEMP/cleanPlant2';
import plant3 from './service/TEMP/cleanPlant3';

const camera = (state = false, action) => {
	switch (action.type) {
		case 'CAM_ON/OFF':
			return (state = !state);
		default:
			return state;
	}
};

const plantList = [plant1, plant2, plant3];
const garden = (state = plantList, action) => {
	switch (action.type) {
		case 'INSERT':
			return state;
		default:
			return state;
	}
};

const rootReducer = combineReducers({
	camera,
	garden,
});

export default rootReducer;
