import './Navbar.css';
function Navbar({setTakePhoto}) {
	function openCamera() {
		setTakePhoto((takePhoto) => {
			setTakePhoto(!takePhoto);
		});
	}
	return (
		<div className="Navbar">
			<button>
				<span className="nav-icon">🧑‍🌾</span>
			</button>
			<button>
				<span
					className="nav-icon"
					onClick={openCamera}>
					📷
				</span>
			</button>
			<button>
				<span className="nav-icon">🪴</span>
			</button>
		</div>
	);
}

export default Navbar;
