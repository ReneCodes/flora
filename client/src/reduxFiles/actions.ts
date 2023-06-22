import { Route, Plant, IdentResponse } from "../Types";


export const changeAppRoute = (route: Route) => ({
	type: 'NEW_ROUTE' as const,
	payload: route,
	_id: null
});

export const accessCamera = () => ({
	type: 'CAM_ON/OFF' as const,
	payload: null,
	_id: null
});

export const addPlantToGarden = (plant: Plant) => ({
	type: 'INSERT' as const,
	payload: plant,
	_id: null
});

export const changePlantName = (text: string, _id: string) => ({
	type: 'CHANGE_NAME' as const,
	payload: text,
	_id,
});

export const attachPlantNote = (note: string, _id: string) => ({
	type: 'ATTACH_NOTE' as const,
	payload: note,
	_id,
});

export const storeGarden = (garden: Plant[]) => ({
	type: 'STORE_GARDEN' as const,
	payload: garden,
	_id: null
});

//From Homepage and PlantTile, selectPlant is called with idx which is the indexOf plant in the garden.
export const selectPlant = (plantIndex: number) => ({
	type: 'SELECT_PLANT' as const,
	payload: plantIndex,
	_id: null,
});

export const deletePlantFromGarden = (plantIndex: number) => ({
	type: 'DELETE_PLANT' as const,
	payload: plantIndex,
	idx: null
});

export const unselectPlant = () => ({
	type: 'UNSELECT_PLANT' as const,
	payload: null,
	_id: null
});

export const storeIdentResult = (identResult: IdentResponse) => ({
	type: 'STORE_IDENT_RESULT' as const,
	payload: identResult,
	_id: null
});
