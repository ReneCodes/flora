import { Route, Plant, Idx, Note, Garden } from "./Types";


export const changeAppRoute = (route: Route) => ({
	type: 'NEW_ROUTE' as const,
	payload: route,
});

export const accessCamera = () => ({
	type: 'CAM_ON/OFF' as const,
});

export const addPlantToGarden = (plant: Plant) => ({
	type: 'INSERT' as const,
	payload: plant,
});

export const changePlantName = (text: Text, idx: Idx) => ({
	type: 'CHANGE_NAME' as const,
	payload: text,
	idx,
});

export const attachPlantNote = (note: Note, idx: Idx) => ({
	type: 'ATTACH_NOTE' as const,
	payload: note,
	idx,
});

export const storeGarden = (garden: Garden) => ({
	type: 'STORE_GARDEN' as const,
	garden,
});

export const viewPlant = (idx) => ({
	type: 'SELECT_PLANT' as const,
	idx,
});

export const deletePlantFromGarden = (plantIDX) => ({
	type: 'DELETE_PLANT' as const,
	payload: plantIDX,
});

export const unselectPlant = () => ({
	type: 'UNSELECT_PLANT' as const,
});

export const storeIdentResult = (plants) => ({
	type: 'STORE_IDENT_RESULT' as const,
	payload: plants,
});