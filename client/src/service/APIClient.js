//
import axios from 'axios';
import toast from 'react-hot-toast';

axios.defaults.baseURL = 'http://127.0.0.1:4242';

// Fetch garden data
export async function getGarden() {
	return await axios
		.get('/garden')
		.then((res) => res.data)
		.catch((error) => console.log('\n getGarden ERROR\n', error));
}

// Send base64 img string to BE
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
			return res.data;
		})
		.catch((error) => {
			errorToast(`Server Error`);
			console.error('Error: ', error);
		});

	return identResult;
}

// Send suggested plant to BE
export async function savePlant(plant) {
	const res = await axios
		.post('/garden', plant, {
			headers: {
				'Content-Type': 'application/json',
			},
		})
		.then((data) => {
			successToast('Successfully planted');
			return data;
		})
		.catch((error) => {
			errorToast(`Unable to plant it`);
			console.log('\n savePLant ERROR\n', error);
		});

	return res;
}

// Update a plant
export async function updatePlant(newData) {
	const res = await axios
		.put('/garden', newData, {
			headers: {
				'Content-Type': 'application/json',
			},
		})
		.then((data) => {
			successToast(newData.note ? 'Note updated' : 'Name updated');
			return data;
		})
		.catch((error) => {
			errorToast('Error during update');
			console.log('\n savePLant ERROR\n', error);
		});
	return res;
}

// Delete Plant
export async function deletePlant(_idObj) {
	const res = await axios
		.delete(`/garden`, {
			data: _idObj,
		})
		.then((data) => {
			successToast('Plant deleted');
			return data;
		})
		.catch((error) => {
			errorToast(`Couldn't delete plant`);
			console.log('\n savePLant ERROR\n', error);
		});

	return res;
}

// REACT HOT TOAST
function successToast(msg) {
	toast.success(msg, {
		style: {
			background: '#d0f7e8',
		},
		duration: 3000,
	});
}
function errorToast(msg) {
	toast.error(msg, {
		style: {
			background: '#cf8583',
		},
		duration: 3000,
	});
}
