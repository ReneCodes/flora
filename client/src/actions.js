export const changeAppRoute = (route) => ({
	type: 'NEW_ROUTE',
	payload: route,
});

export const accessCamera = () => ({
	type: 'CAM_ON/OFF',
});

export const addPlantToGarden = (plant) => ({
	type: 'INSERT',
	payload: plant,
});

export const changePlantName = (text, idx) => ({
	type: 'CHANGE_NAME',
	payload: text,
	idx,
});

export const attachPlantNote = (note, idx) => ({
	type: 'ATTACH_NOTE',
	payload: note,
	idx,
});

export const storeGarden = (garden) => ({
	type: 'STORE_GARDEN',
	garden,
});

export const viewPlant = (idx) => ({
	type: 'SELECT_PLANT',
	idx,
});

export const deletePlantFromGarden = (plantIDX) => ({
	type: 'DELETE_PLANT',
	payload: plantIDX,
});

export const unselectPlant = () => ({
	type: 'UNSELECT_PLANT',
});

export const storeIdentResult = (plants) => ({
	type: 'STORE_IDENT_RESULT',
	payload: plants,
});
