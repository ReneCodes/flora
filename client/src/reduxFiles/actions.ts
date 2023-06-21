import { Route, Plant, IdentResponse } from "../Types";


export const changeAppRoute = (route: Route) => ({
	type: 'NEW_ROUTE' as const,
	payload: route,
	idx: null
});

export const accessCamera = () => ({
	type: 'CAM_ON/OFF' as const,
	payload: null,
	idx: null
});

export const addPlantToGarden = (plant: Plant) => ({
	type: 'INSERT' as const,
	payload: plant,
	idx: null
});

export const changePlantName = (text: string, idx: number) => ({
	type: 'CHANGE_NAME' as const,
	payload: text,
	idx,
});

export const attachPlantNote = (note: string, idx: number) => ({
	type: 'ATTACH_NOTE' as const,
	payload: note,
	idx,
});

export const storeGarden = (garden: Plant[]) => ({
	type: 'STORE_GARDEN' as const,
	payload: garden,
	idx: null
});

export const viewPlant = (idx: number) => ({
	type: 'SELECT_PLANT' as const,
	payload: null,
	idx,
});

export const deletePlantFromGarden = (plantIDX: number) => ({
	type: 'DELETE_PLANT' as const,
	payload: plantIDX,
	idx: null
});

export const unselectPlant = () => ({
	type: 'UNSELECT_PLANT' as const,
	payload: null,
	idx: null
});

export const storeIdentResult = (identResult: IdentResponse) => ({
	type: 'STORE_IDENT_RESULT' as const,
	payload: identResult,
	idx: null
});
