//
// Fetch garden data
// FIXME: fix endpoint /garden
export async function getGarden() {
	const res = await fetch('http://127.0.0.1:4242/')
		.then((data) => data.json())
		.catch((error) => console.log('\n getGarden ERROR\n', error));

	console.log(res);
	return res;
}

// Send base64 img string to BE
// FIXME: fix endpoint /identify
// FIXME: fix data
export async function findPLant(dataUrl) {
	const temp = 'FIND MY PLANT';
	const res = await fetch('http://127.0.0.1:4242/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({dataUrl: temp}),
	})
		.then((data) => data.json())
		.catch((error) => console.log('\n findPLant ERROR\n', error));

	console.log(res);
	return res;
}

// Send suggested plant to BE
// FIXME: fix endpoint /garden and data
// FIXME: fix data
export async function savePLant(plant) {
	const temp = 'Some Plant Info';
	const res = await fetch('http://127.0.0.1:4242/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({plant: temp}),
	})
		.then((data) => data.json())
		.catch((error) => console.log('\n savePLant ERROR\n', error));

	console.log(res);
	return res;
}

// Update a plant
// FIXME: fix endpoint /garden
// FIXME: fix data
export async function updatePLant(newData) {
	const temp = {
		_id: 'oasbdoabda',
		note: 'personal Plant note',
	};
	const res = await fetch('http://127.0.0.1:4242/', {
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
// FIXME: fix endpoint /garden
export async function deletePLant(_id) {
	const id = 'aosdo;ado;haw';
	const res = await fetch('http://127.0.0.1:4242/', {
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
