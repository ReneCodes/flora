export const accessCamera = () => ({
	type: 'CAM_ON/OFF',
});

export const changePlantName = (text, idx) => ({
	type: 'CHANGE_NAME',
	payload: text,
	idx,
});

export const storeGarden = (garden) => ({
	type: 'STORE_GARDEN',
	garden,
});

export const viewPlant = (plant) => ({
	type: 'SELECT_PLANT',
	plant,
});
export const unselectPlant = () => ({
	type: 'UNSELECT_PLANT',
});
