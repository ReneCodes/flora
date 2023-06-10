//
// Fetch garden data
// FIXME: fix endpoint /garden
export async function getGarden() {
	return await fetch('http://127.0.0.1:4242/')
		.then((data) => data.json())
		.catch((error) => console.log('\n getGarden ERROR\n', error));
}

// Send base64 img string to BE
// FIXME: fix endpoint /identify
export async function findPLant(dataUrl) {
	return await fetch('http://127.0.0.1:4242/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: {dataUrl},
	})
		.then((data) => console.log(data.json()))
		.catch((error) => console.log('\n findPLant ERROR\n', error));
}

// Send suggested plant to BE
// FIXME: fix endpoint /garden
export async function savePLant(plant) {
	await fetch('http://127.0.0.1:4242/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(plant),
	})
		.then((data) => console.log(data.json()))
		.catch((error) => console.log('\n savePLant ERROR\n', error));
}

// Update a plant
// FIXME: fix endpoint /garden
export async function savePLant(newData) {
	await fetch('http://127.0.0.1:4242/', {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newData), // {_id , note}
	})
		.then((data) => console.log(data.json()))
		.catch((error) => console.log('\n savePLant ERROR\n', error));
}

// Delete Plant
// FIXME: fix endpoint /garden
export async function deletePLant(_id) {
	await fetch('http://127.0.0.1:4242/', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
		body: {_id},
	})
		.then((data) => console.log(data.json()))
		.catch((error) => console.log('\n savePLant ERROR\n', error));
}
