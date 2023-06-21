import './App.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { storeGarden } from './reduxFiles/actions';
import { Toaster } from 'react-hot-toast';

import Camera from './Components/Camera/Camera';
import Navbar from './Components/Navbar/Navbar';
import Homepage from './Components/Homepage/Homepage';
import Garden from './Components/Garden/Garden';
import Suggestions from './Components/Suggestions/Suggestions';
import Guide from './Components/Guide/Guide';
import CareGuide from './Components/Guide/CareGuide';
import WaterGuide from './Components/Guide/WaterGuide';

import * as service from './service/APIClient';
import { RootState } from './reduxFiles/store';
import React from 'react';
import { Plant } from './Types'
import PlantInfo from './Components/Plant/PlantInfo';

function App() {
	const isCameraOn: boolean = useSelector((state: RootState) => state.camera);
	const route: string[] = useSelector((state: RootState) => state.basicRouting);
	const dispatch = useDispatch();

	async function fetchGarden(): Promise<void> {
		try {
			const garden: Plant[] = await service.getGarden();
			dispatch(storeGarden(garden));
		} catch (error) {
			console.log('Error fetching Garden', error);
		}
	}

	useEffect(() => {
		fetchGarden();
	}, []);

	return (
		<section className="app-component">
			<div className="app">
				{isCameraOn && <Camera />}

				<div className="toaster fixed">
					<Toaster
						containerStyle={{
							position: 'relative',
							top: 50,
							left: 10,
							width: '300px',
						}}
					/>
				</div>
				<div className="app-content">
					{route[0] === 'home' && <Homepage />}
					{route[0] === 'plantInfo' && <PlantInfo />}
					{route[0] === 'garden' && <Garden />}
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

// function TestSection() {
// 	return (
// 		<>
// 			<div className="block">YELLOW BOX</div>
// 			<div className="block">
// 				{/* <button
// 							className="btn-API"
// 							onClick={service.getGarden}>
// 							GET Garden
// 						</button> */}
// 				<button
// 					className="btn-API"
// 					onClick={service.findPlant}>
// 					FIND PLant
// 				</button>
// 			</div>
// 			<div className="block">
// 				<button
// 					className="btn-API"
// 					onClick={service.savePlant}>
// 					SAVE PLant
// 				</button>
// 			</div>
// 			<div className="block">
// 				{' '}
// 				<button
// 					className="btn-API"
// 					onClick={() => /*service.updatePlant*/console.log("Hello there")}>
// 					UPDATE PLant
// 				</button>
// 				<button
// 					className="btn-API"
// 					onClick={e => service.deletePlant(e)}>
// 					DELETE PLant
// 				</button>
// 			</div>
// 		</>
// 	);
// }

export default App;
