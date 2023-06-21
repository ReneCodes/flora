//
import axios from 'axios';
import toast from 'react-hot-toast';
import { IdentResponse, Plant } from '../Types'

// import cleanPlant1 from './TEMP/cleanPlant1';
// import cleanPlant2 from './TEMP/cleanPlant2';
// import cleanPlant3 from './TEMP/cleanPlant3';

// Fetch garden data
export async function getGarden(): Promise<Plant[]> {
	const res: Plant[] = await fetch('http://127.0.0.1:4242/garden')
		.then((data) => data.json())
		.catch((error) => console.log('\n getGarden ERROR\n', error));

	// console.log(res);
	return res;
}

// Send base64 img string to BE
export async function findPlant(dataURL: string): Promise<IdentResponse> {
	let config = {
		method: 'post',
		maxBodyLength: Infinity,
		url: 'http://127.0.0.1:4242/identify',
		headers: {
			'Content-Type': 'application/json',
		},
		data: { dataURL },
	};
	const identResult: IdentResponse = await axios
		.request(config)
		.then((res) => {
			console.log('Success:', res.data);
			return res.data;
		})
		.catch((error) => {
			errorToast(`Server Error`);
			console.error('Error: ', error);
		});

	return identResult;
}

// Send suggested plant to BE

export async function savePlant(plant: Plant | React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<Plant> {
	// const temp = cleanPlant3;
	const res: Plant = await fetch('http://127.0.0.1:4242/garden', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(plant),
	})
		.then((data) => {
			successToast('Successfully planted');
			return data.json();
		})
		.catch((error) => {
			errorToast(`Unable to plant it`);
			console.log('\n savePLant ERROR\n', error);
		});

	console.log(res);
	return res;
}

// Update a plant
export async function updatePlant(newData: { _id?: string, api_id?: number, personal_name?: string, note?: string }): Promise<{ result: string, plant: Plant }> {
	const res: { result: string, plant: Plant } = await fetch('http://127.0.0.1:4242/garden', {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newData), // {_id , note, personal_name}
	})
		.then((data) => {
			successToast(newData.note ? 'Note updated' : 'Name updated');
			return data.json();
		})
		.catch((error) => {
			errorToast('Error during update');
			console.log('\n savePLant ERROR\n', error);
		});
	// console.log(res);
	return res;
}

// Delete Plant
export async function deletePlant(_idObj: number | string | React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<string> {
	const res: string = await fetch('http://127.0.0.1:4242/garden', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(_idObj),
	})
		.then((data) => {
			successToast('Plant deleted');
			return data.json();
		})
		.catch((error) => {
			errorToast(`Couldn't delete plant`);
			console.log('\n savePLant ERROR\n', error);
		});

	console.log(res);
	return res;
}

function successToast(msg: string) {
	toast.success(msg, {
		style: {
			background: '#d0f7e8',
		},
		duration: 3000,
	});
}
function errorToast(msg: string) {
	toast.error(msg, {
		style: {
			background: '#cf8583',
		},
		duration: 3000,
	});
}
