//
import axios from 'axios';
import cleanPlant from './TEMP/cleanPlant1';
// Fetch garden data
export async function getGarden() {
	const res = await fetch('http://127.0.0.1:4242/garden')
		.then((data) => data.json())
		.catch((error) => console.log('\n getGarden ERROR\n', error));

	console.log(res);
	return res;
}

// Send base64 img string to BE
// FIXME: fix data input
export async function findPLant(dataURL) {
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
export async function savePLant(plant) {
	const temp = cleanPlant;
	const res = await fetch('http://127.0.0.1:4242/garden', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(temp),
	})
		.then((data) => data.json())
		.catch((error) => console.log('\n savePLant ERROR\n', error));

	console.log(res);
	return res;
}

// Update a plant
// FIXME: fix data input
export async function updatePLant(newData) {
	const temp = {
		_id: '648435fca70f131b5eaa2f5d',
		note: 'New trial Plant note',
		personal_name: 'Bob',
	};
	const res = await fetch('http://127.0.0.1:4242/garden', {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(temp), // {_id , note}
	})
		.then((data) => data.json())
		.catch((error) => console.log('\n savePLant ERROR\n', error));

	console.log(res);
	return res;
}

// Delete Plant
// FIXME: fix data input
export async function deletePLant(_id) {
	const id = '64842a8f9d13d4566dbe1d8e';
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
