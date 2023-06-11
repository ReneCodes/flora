export const accessCamera = () => ({
	type: 'CAM_ON/OFF',
});

export const changePlantName = (text, idx) => ({
	type: 'CHANGE_NAME',
	payload: text,
	idx,
});
