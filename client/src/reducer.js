import {combineReducers} from 'redux';
import plant1 from './service/TEMP/cleanPlant1';
import plant2 from './service/TEMP/cleanPlant2';
import plant3 from './service/TEMP/cleanPlant3';
import identResponse from './service/TEMP/identResponse';

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
			return [...state, action.payload];
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
		case 'DELETE_PLANT':
			const index = action.payload;
			console.log(action.payload);
			if (index == 0) return state.slice(1);
			if (index == state.length - 1) return state.slice(0, -1);
			else {
				const firstPart = state.slice(0, index);
				const lastPart = state.slice(index + 1);

				return (state = firstPart.concat(lastPart));
			}
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

//need to properly declare state and reinitialize on ts conversion.
const identPlants = (state, action) => {
	switch (action.type) {
		case 'STORE_IDENT_RESULT':
			state = action.payload;
			return state;
		default:
			return state;
	}
};

const basicRouting = (state = ['home', ''], action) => {
	// state => ['current Route','previous Route']
	switch (action.type) {
		case 'NEW_ROUTE':
			state[1] = state[0];
			state[0] = action.payload;
			return [...state];
		default:
			return state;
	}
};

const rootReducer = combineReducers({
	camera,
	garden,
	plant,
	identPlants,
	basicRouting,
});

export default rootReducer;
