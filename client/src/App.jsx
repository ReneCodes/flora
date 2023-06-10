import './App.css';
import {useEffect, useState} from 'react';
import Camera from './Components/Camera/Camera';
import Navbar from './Components/Navbar/Navbar';
import * as service from './service/APIClient';

function App() {
	const [takePhoto, setTakePhoto] = useState(false);
	return (
		<div className="App-Container">
			<div className="App">
				<div className="App-content">
					<div className="block logo">FLORA</div>
					{takePhoto ? <Camera></Camera> : <div className="block">CAM</div>}
					<div className="block">
						<button
							className="btn-API"
							onClick={service.getGarden}>
							GET Garden
						</button>
						<button
							className="btn-API"
							onClick={service.findPLant}>
							FIND PLant
						</button>
						<button
							className="btn-API"
							onClick={service.savePLant}>
							SAVE PLant
						</button>
					</div>
					<div className="block">
						{' '}
						<button
							className="btn-API"
							onClick={service.updatePLant}>
							UPDATE PLant
						</button>
						<button
							className="btn-API"
							onClick={service.deletePLant}>
							DELETE PLant
						</button>
					</div>
					<div className="block">yellow</div>
				</div>
				<Navbar setTakePhoto={setTakePhoto}></Navbar>
			</div>
		</div>
	);
}

export default App;
