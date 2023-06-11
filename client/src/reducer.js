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

const garden = (state = [], action) => {
	switch (action.type) {
		case 'INSERT':
			// TODO insert plant in list
			return state;
		case 'CHANGE_NAME':
			state[action.idx].personal_name = action.payload;
			// console.log('CHANGE_NAME', state[idx].personal_name);
			state = [...state];
			return state;
		case 'ATTACH_NOTE':
			state[action.idx].note = action.payload;
			// console.log('ATTACH_NOTE', state[idx].note);
			state = [...state];
			return state;
		case 'STORE_GARDEN':
			return (state = action.garden);
		default:
			return state;
	}
};

const plant = (state = false, action) => {
	switch (action.type) {
		case 'SELECT_PLANT':
			return (state = action.idx);
		case 'UNSELECT_PLANT':
			return (state = false);
		default:
			return state;
	}
};

const rootReducer = combineReducers({
	camera,
	garden,
	plant,
});

export default rootReducer;
