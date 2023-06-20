import './Homepage.css';
import { useSelector, useDispatch } from 'react-redux';
import { changeAppRoute, accessCamera, viewPlant } from '../../actions';
import CareGuideLink from '../Navbar/CareGuideLink';
import WaterGuideLink from '../Navbar/WaterGuideLink';

// function PlantsInGarden({ garden }) {
// 	const dispatch = useDispatch();
// 	function openCamera() {
// 		dispatch(accessCamera()); // turn on/Off
// 	}

// 	function goToPlant(idx, route) {
// 		dispatch(viewPlant(Number(idx)));
// 		dispatch(changeAppRoute(route));
// 	}

// 	function ShowImage({ idx }) {
// 		const image = garden[idx].images[0].url;
// 		return (
// 			<img
// 				src={image}
// 				alt=""
// 				onClick={() => goToPlant(idx, 'plantInfo')}></img>
// 		);
// 	}

// 	return (

// 		<>
// 			<div className="card-img">
// 				<button>{garden[0] ? <ShowImage idx={0} /> : <p onClick={openCamera}>📸</p>}</button>
// 			</div>
// 			<div className="card-img">
// 				<button>{garden[1] ? <ShowImage idx={1} /> : <p onClick={openCamera}>📸</p>}</button>
// 			</div>
// 		</>
// 	);
// }

function Homepage() {
	const dispatch = useDispatch();
	const garden = useSelector((state) => state.garden);
	// const garden = ''; //TODO: delete this variable

	function navigateRoute(switchRoute) {
		console.log(switchRoute);
		dispatch(changeAppRoute(switchRoute));
	}

	//moved function to component
	function ShowImage({ idx }) {
		const image = garden[idx].images[0].url;
		return (
			<img
				src={image}
				alt=""
				onClick={() => goToPlant(idx, 'plantInfo')}></img>
		);
	}

	function goToPlant(idx, route) {
		dispatch(viewPlant(Number(idx)));
		dispatch(changeAppRoute(route));
	}

	return (
		<>
			<div className="logo">FLORA</div>

			<div className="homepage-component">
				<div className="card">
					<button onClick={() => navigateRoute('garden')}>
						<div className="card-title card-main">
							<h2>GARDEN</h2>
							<p className="card-icon wobble">🪴</p>
						</div>
					</button>
					<div className="card-box">

						{garden.slice(0, 2).map(plant => (
							<div className="card-img">
								<ShowImage idx={garden.indexOf(plant)} />
							</div>
						))}

						{/* <PlantsInGarden garden={garden} /> */}
					</div>
					{!garden && (
						<div className="card-info">
							<h3 className="blob lavender">No Plants in Garden</h3>
						</div>
					)}
				</div>
				{/* <CareGuideLink navigateRoute={navigateRoute} /> */}
				<CareGuideLink />
				<WaterGuideLink />
			</div>
		</>
	);
}

export default Homepage;
