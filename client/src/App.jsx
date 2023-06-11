import './App.css';
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {storeGarden} from './actions';

import Camera from './Components/Camera/Camera';
import Navbar from './Components/Navbar/Navbar';
import Homepage from './Components/Homepage/Homepage';
import Garden from './Components/Garden/Garden';

import * as service from './service/APIClient';

function App() {
	const isCameraOn = useSelector((state) => state.camera);
	const dispatch = useDispatch();

	async function fetchGarden() {
		const garden = await service.getGarden();

		dispatch(storeGarden(garden));
	}

	useEffect(() => {
		fetchGarden();
	}, []);

	return (
		<div className="App-Container">
			<div className="App">
				{isCameraOn ? <Camera></Camera> : ''}
				<div className="App-content">
					{/* <div className="logo">FLORA</div> */}
					{/* <Homepage></Homepage> */}
					<Garden></Garden>
					{/* Experimental BOXES for testing functionalities */}

					<div className="block">YELLOW BOX</div>
					<div className="block">
						{/* <button
							className="btn-API"
							onClick={service.getGarden}>
							GET Garden
						</button> */}
						<button
							className="btn-API"
							onClick={service.findPlant}>
							FIND PLant
						</button>
					</div>
					<div className="block">
						<button
							className="btn-API"
							onClick={service.savePlant}>
							SAVE PLant
						</button>
					</div>
					<div className="block">
						{' '}
						<button
							className="btn-API"
							onClick={service.updatePlant}>
							UPDATE PLant
						</button>
						<button
							className="btn-API"
							onClick={service.deletePlant}>
							DELETE PLant
						</button>
					</div>
				</div>
				<Navbar></Navbar>
			</div>
		</div>
	);
}

export default App;
