import './App.css';
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {storeGarden} from './actions';
import {Toaster} from 'react-hot-toast';

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
	const isCameraOn = useSelector((state) => state.cameraOn);
	const isCameraOff = !isCameraOn;
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
					{(route[0] === 'garden' || route[0] === 'plantInfo') && <Garden />}
					{route[0] === 'identResult' && <Suggestions />}
					{route[0] === 'guides' && <Guide />}
					{route[0] === 'careGuide' && <CareGuide />}
					{route[0] === 'waterGuide' && <WaterGuide />}
				</div>
				{isCameraOff && <Navbar />}
			</div>
		</section>
	);
}

export default App;
