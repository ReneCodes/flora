import './App.css';
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {storeGarden} from './actions';

import Camera from './Components/Camera/Camera';
import Navbar from './Components/Navbar/Navbar';
import Homepage from './Components/Homepage/Homepage';
import Garden from './Components/Garden/Garden';
import Suggestions from './Components/Suggestions/Suggestions';
import Guide from './Components/Guide/Guide';
import CareGuide from './Components/Guide/CareGuide';
import WaterGuide from './Components/Guide/WaterGuide';

import * as service from './service/APIClient';

function App() {
	const isCameraOn = useSelector((state) => state.camera);
	const route = useSelector((state) => state.basicRouting);
	const dispatch = useDispatch();

	async function fetchGarden() {
		try {
			const garden = await service.getGarden();
			dispatch(storeGarden(garden));
		} catch (error) {
			console.log('Error fetching Garden', error);
		}
	}

	useEffect(() => {
		fetchGarden();
	}, []);

	return (
		<section className="App-Container">
			<div className="App">
				{isCameraOn && <Camera />}
				<div className="App-content">
					{route[0] === 'home' && <Homepage />}
					{(route[0] === 'garden' || route[0] === 'plantInfo') && <Garden />}
					{route[0] === 'identResult' && <Suggestions />}
					{route[0] === 'guides' && <Guide />}
					{route[0] === 'careGuide' && <CareGuide />}
					{route[0] === 'waterGuide' && <WaterGuide />}

					{/* Experimental BOXES for testing functionalities */}
					{/* <TestSection></TestSection> */}
				</div>
				{/* {!isCameraOn && <Navbar></Navbar>} */}
				{!isCameraOn && <Navbar />}
				{/* <Navbar /> */}
			</div>
		</section>
	);
}

function TestSection() {
	return (
		<>
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
		</>
	);
}

export default App;
