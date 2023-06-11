import './App.css';
import Camera from './Components/Camera/Camera';
import Navbar from './Components/Navbar/Navbar';
import * as service from './service/APIClient';
import {useSelector, useDispatch} from 'react-redux';

import Homepage from './Components/Homepage/Homepage';
import Garden from './Components/Garden/Garden';

function App() {
	const isCameraOn = useSelector((state) => state.camera);

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
				</div>
				<Navbar></Navbar>
			</div>
		</div>
	);
}

export default App;
