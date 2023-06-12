import './Navbar.css';
import {useDispatch, useSelector} from 'react-redux';
import {accessCamera} from '../../actions';
import {changeAppRoute} from '../../actions';

function Navbar() {
	const dispatch = useDispatch();
	const route = useSelector((state) => state.basicRouting);
	const currentRoute = route[0];
	const previousRoute = route[1];
	console.log('Navbar', currentRoute);

	function navigateRoute(e) {
		const route = e.target.attributes.route.value;
		dispatch(changeAppRoute(route));
	}

	function openCamera() {
		dispatch(accessCamera()); // turn on/Off
	}
	return (
		<div className="Navbar">
			<button onClick={navigateRoute}>
				<span
					className="nav-icon"
					route="guide">
					🧑‍🌾
				</span>
			</button>
			<button onClick={openCamera}>
				<span
					className="nav-icon"
					route="camera">
					📷
				</span>
			</button>
			<button onClick={navigateRoute}>
				{currentRoute === 'home' && (
					<span
						className="nav-icon"
						route="garden">
						🪴
					</span>
				)}
				{currentRoute === 'identResult' && (
					<span
						className="nav-icon"
						route="garden">
						🪴
					</span>
				)}
				{currentRoute === 'plantInfo' && (
					<span
						className="nav-icon"
						route="garden">
						🪴
					</span>
				)}
				{((currentRoute === 'garden' && previousRoute === 'home') ||
					(currentRoute === 'garden' && previousRoute === 'plantInfo')) && (
					<span
						className="nav-icon"
						route="home">
						🏡
					</span>
				)}
				{currentRoute === 'plantInfo' && previousRoute === 'home' && (
					<span
						className="nav-icon"
						route="garden">
						🪴
					</span>
				)}
			</button>
		</div>
	);
}

export default Navbar;
