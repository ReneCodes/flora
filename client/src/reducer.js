import {combineReducers} from 'redux';

const cameraOn = (state = false, action) => {
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
			state = [...state];
			return state;
		case 'ATTACH_NOTE':
			state[action.idx].note = action.payload;
			state = [...state];
			return state;
		case 'STORE_GARDEN':
			return (state = action.garden);
		case 'DELETE_PLANT':
			const index = action.payload;
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

const identPlants = (state = '', action) => {
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
	cameraOn,
	garden,
	plant,
	identPlants,
	basicRouting,
});

export default rootReducer;
