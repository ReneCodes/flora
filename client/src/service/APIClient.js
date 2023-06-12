//
import axios from 'axios';

import cleanPlant1 from './TEMP/cleanPlant1';
import cleanPlant2 from './TEMP/cleanPlant2';
import cleanPlant3 from './TEMP/cleanPlant3';

// Fetch garden data
export async function getGarden() {
	const res = await fetch('http://127.0.0.1:4242/garden')
		.then((data) => data.json())
		.catch((error) => console.log('\n getGarden ERROR\n', error));

	// console.log(res);
	return res;
}

// Send base64 img string to BE
// FIXME: fix data input
export async function findPlant(dataURL) {
	let config = {
		method: 'post',
		maxBodyLength: Infinity,
		url: 'http://127.0.0.1:4242/identify',
		headers: {
			'Content-Type': 'application/json',
		},
		data: {dataURL},
	};
	const identResult = await axios
		.request(config)
		.then((res) => {
			console.log('Success:', res.data);
			return res.data;
		})
		.catch((error) => {
			console.error('Error: ', error);
		});

	console.log(res);
	return identResult;
}

// Send suggested plant to BE
// FIXME: fix data input
export async function savePlant(plant) {
	const temp = cleanPlant3;
	const res = await fetch('http://127.0.0.1:4242/garden', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(plant),
	})
		.then((data) => data.json())
		.catch((error) => console.log('\n savePLant ERROR\n', error));

	console.log(res);
	return res;
}

// Update a plant
export async function updatePlant(newData) {
	const res = await fetch('http://127.0.0.1:4242/garden', {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newData), // {_id , note, personal_name}
	})
		.then((data) => data.json())
		.catch((error) => console.log('\n savePLant ERROR\n', error));

	console.log(res);
	return res;
}

// Delete Plant
// FIXME: fix data input
export async function deletePlant(_id) {
	const id = '648435fca70f131b5eaa2f5d';
	const res = await fetch('http://127.0.0.1:4242/garden', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({_id: id}),
	})
		.then((data) => data.json())
		.catch((error) => console.log('\n savePLant ERROR\n', error));

	console.log(res);
	return res;
}
