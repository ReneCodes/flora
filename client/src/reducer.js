import {combineReducers} from 'redux';

const camera = (state = false, action) => {
	switch (action.type) {
		case 'CAM_ON/OFF':
			return (state = !state);
		default:
			return state;
	}
};

const rootReducer = combineReducers({
	camera,
});

export default rootReducer;
