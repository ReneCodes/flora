import {useEffect, useState} from 'react';
import Camera from './Components/Camera/Camera';
import Navbar from './Components/Navbar/Navbar';
import './App.css';

function App() {
	const [takePhoto, setTakePhoto] = useState(false);
	return (
		<div className="App-Container">
			<div className="App">
				<div className="App-content">
					<div className="block logo">FLORA</div>
					{takePhoto ? <Camera></Camera> : <div className="block">CAM</div>}
					<div className="block">yellow</div>
					<div className="block">yellow</div>
					<div className="block">yellow</div>
				</div>
				<Navbar setTakePhoto={setTakePhoto}></Navbar>
			</div>
		</div>
	);
}

export default App;
