import { combineReducers } from 'redux';
import plant1 from '../service/TEMP/cleanPlant1';
import plant2 from '../service/TEMP/cleanPlant2';
import plant3 from '../service/TEMP/cleanPlant3';
import identResponse from '../service/TEMP/identResponse';
import { Action, IdentResponse, Plant } from '../Types';

const camera = (state: boolean = false, action: Action) => {
	switch (action.type) {
		case 'CAM_ON/OFF':
			return (state = !state);
		default:
			return state;
	}
};

const garden = (state: Plant[] = [], action: Action) => {
	switch (action.type) {
		case 'INSERT':
			return [...state, action.payload as Plant];
		case 'CHANGE_NAME':
			state[`${action.idx}`].personal_name = action.payload;
			// console.log('CHANGE_NAME', state[idx].personal_name);
			state = [...state];
			return state;
		case 'ATTACH_NOTE':
			state[`${action.idx}`].note = action.payload;
			// console.log('ATTACH_NOTE', state[idx].note);
			state = [...state];
			return state;
		case 'STORE_GARDEN':
			return (state = action.payload as Plant[]);
		case 'DELETE_PLANT':
			const index = action.payload as number;
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

const plant = (state: boolean | number = false, action: Action) => {
	switch (action.type) {
		case 'SELECT_PLANT':
			return (state = action.idx as number);
		case 'UNSELECT_PLANT':
			return (state = false);
		default:
			return state;
	}
};

const identPlants = (state: IdentResponse = {
	uploaded_datetime: "",
	images: [],
	suggestions: [],
	//******CANNOT FIND NON-NULL EXAMPLES  OF FAIL_CAUSE OR FEEDBACK HERE OR IN API DOCS, SO LEAVING THEM
	//******AS NULL FOR NOW, BUT THIS COULD BE THE CAUSE OF AN ERROR LATER */
	fail_cause: null,
	countable: false,
	feedback: null,
	is_plant_probability: 0,
	is_plant: false,
}, action: Action) => {
	switch (action.type) {
		case 'STORE_IDENT_RESULT':
			state = action.payload as IdentResponse;
			return state;
		default:
			return state;
	}
};

const basicRouting = (state: string[] = ['home', ''], action: Action) => {
	//I understand what this is trying to do, however in the switch cases the state argument is used,
	//not the state below, and I'm not sure why its saying the one below is not used when it is
	//uncommented.

	// state => ['current Route','previous Route']
	switch (action.type) {
		case 'NEW_ROUTE':
			state[1] = state[0];
			state[0] = action.payload as string;
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
