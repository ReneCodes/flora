import './Navbar.css';
import {useDispatch} from 'react-redux';
import {accessCamera} from '../../actions';

function Navbar() {
	const dispatch = useDispatch();

	function openCamera() {
		dispatch(accessCamera()); // turn on/Off
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
