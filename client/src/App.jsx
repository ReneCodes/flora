import Camera from './Components/Camera';
import './App.css';

function App() {
	return (
		<div className="App-Container">
			<div className="App">
				{/* <Camera></Camera> */}

				<div className="App-content">
					<div className="block">Block</div>
					<div className="block">Block</div>
					<div className="block">Block</div>
					<div className="block">Block</div>
					<div className="block">Block</div>
				</div>
				<div className="Navbar">
					<button>
						<span className="nav-icon">🧑‍🌾</span>
					</button>
					<button>
						<span className="nav-icon">📷</span>
					</button>
					<button>
						<span className="nav-icon">🪴</span>
					</button>
				</div>
			</div>
		</div>
	);
}

export default App;
