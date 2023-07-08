import './Navbar.css';
import {useDispatch, useSelector} from 'react-redux';
import {accessCamera} from '../../actions';
import {changeAppRoute} from '../../actions';

function Navbar() {
	const dispatch = useDispatch();
	const route = useSelector((state) => state.basicRouting);
	const currentRoute = route[0];
	const previousRoute = route[1];

	function navigateRoute(e) {
		const route = e.target.attributes.route.value;
		dispatch(changeAppRoute(route));
	}

	function openCamera() {
		dispatch(accessCamera()); // turn on/Off
	}
	return (
		<div className="navbar-component">
			<button onClick={navigateRoute}>
				{(currentRoute === 'home' ||
					currentRoute === 'plantInfo' ||
					currentRoute === 'careGuide' ||
					currentRoute === 'waterGuide' ||
					currentRoute === 'identResult' ||
					currentRoute === 'garden') && (
					<span
						className="nav-icon scale"
						route="guides">
						🧑‍🌾
					</span>
				)}
				{((currentRoute === 'guides' && previousRoute === 'home') ||
					(currentRoute === 'guides' && previousRoute === 'waterGuide') ||
					(currentRoute === 'guides' && previousRoute === 'plantInfo') ||
					(currentRoute === 'guides' && previousRoute === 'identResult') ||
					(currentRoute === 'guides' && previousRoute === 'careGuide') ||
					(currentRoute === 'guides' && previousRoute === 'garden')) && (
					<span
						className="nav-icon scale"
						route="home">
						🏡
					</span>
				)}
			</button>
			<button onClick={openCamera}>
				<span
					className="nav-icon scale"
					route="camera">
					📷
				</span>
			</button>
			<button onClick={navigateRoute}>
				{(currentRoute === 'home' ||
					(currentRoute === 'guides' && previousRoute === 'home') ||
					(currentRoute === 'careGuide' && previousRoute === 'home') ||
					(currentRoute === 'waterGuide' && previousRoute === 'home')) && (
					<span
						className="nav-icon scale"
						route="garden">
						🪴
					</span>
				)}
				{currentRoute === 'identResult' && (
					<span
						className="nav-icon scale"
						route="garden">
						🪴
					</span>
				)}
				{((currentRoute === 'plantInfo' && previousRoute === 'home') ||
					(currentRoute === 'plantInfo' && previousRoute === 'garden') ||
					(currentRoute === 'plantInfo' && previousRoute === 'waterGuide') ||
					(currentRoute === 'plantInfo' && previousRoute === 'careGuide') ||
					(currentRoute === 'plantInfo' && previousRoute === 'guides')) && (
					<span
						className="nav-icon scale"
						route="garden">
						🪴
					</span>
				)}
				{((currentRoute === 'guides' && previousRoute === 'home') ||
					(currentRoute === 'guides' && previousRoute === 'waterGuide') ||
					(currentRoute === 'guides' && previousRoute === 'careGuide') ||
					(currentRoute === 'guides' && previousRoute === 'plantInfo') ||
					(currentRoute === 'guides' && previousRoute === 'identResult') ||
					(currentRoute === 'guides' && previousRoute === 'garden')) && (
					<span
						className="nav-icon scale"
						route="garden">
						🪴
					</span>
				)}
				{((currentRoute === 'garden' && previousRoute === 'home') ||
					(currentRoute === 'garden' && previousRoute === 'guides') ||
					(currentRoute === 'garden' && previousRoute === 'waterGuide') ||
					(currentRoute === 'garden' && previousRoute === 'careGuide') ||
					(currentRoute === 'garden' && previousRoute === 'plantInfo') ||
					(currentRoute === 'garden' && previousRoute === 'identResult')) && (
					<span
						className="nav-icon scale"
						route="home">
						🏡
					</span>
				)}
				{((currentRoute === 'waterGuide' && previousRoute === 'home') ||
					(currentRoute === 'waterGuide' && previousRoute === 'plantInfo') ||
					(currentRoute === 'waterGuide' && previousRoute === 'guides')) && (
					<span
						className="nav-icon scale"
						route="garden">
						🪴
					</span>
				)}
				{((currentRoute === 'careGuide' && previousRoute === 'home') ||
					(currentRoute === 'careGuide' && previousRoute === 'plantInfo') ||
					(currentRoute === 'careGuide' && previousRoute === 'guides')) && (
					<span
						className="nav-icon scale"
						route="garden">
						🪴
					</span>
				)}
			</button>
		</div>
	);
}

export default Navbar;
