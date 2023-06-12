import './Homepage.css';
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {changeAppRoute, accessCamera, viewPlant} from '../../actions';

export function CareGuide({navigateRoute}) {
	return (
		<button onClick={() => navigateRoute('careGuide')}>
			{' '}
			<div className="card">
				<div className="card-title">
					<h2>CARE GUIDE</h2>
					<p className="card-icon">🌱</p>
				</div>
			</div>
		</button>
	);
}
export function WaterGuide({navigateRoute}) {
	return (
		<button onClick={() => navigateRoute('waterGuide')}>
			<div className="card">
				<div className="card-title">
					<h2>WATER GUIDE</h2>
					<p className="card-icon">🌊</p>
				</div>
			</div>
		</button>
	);
}

function PlantsInGarden({garden}) {
	const dispatch = useDispatch();
	function openCamera() {
		dispatch(accessCamera()); // turn on/Off
	}

	function goToPlant(idx, route) {
		dispatch(viewPlant(Number(idx)));

		dispatch(changeAppRoute(route));
	}

	function ShowImage({idx}) {
		const image = garden[idx].images[0].url;
		return (
			<img
				src={image}
				alt=""
				onClick={() => goToPlant(idx, 'plantInfo')}></img>
		);
	}

	return (
		<>
			<div className="card-img">
				<button>{garden.length > 0 ? <ShowImage idx={0}></ShowImage> : <p onClick={openCamera}>📸</p>}</button>
			</div>
			<div className="card-img">
				<button>{garden.length > 0 ? <ShowImage idx={1}></ShowImage> : <p onClick={openCamera}>📸</p>}</button>
			</div>
		</>
	);
}

function Homepage() {
	const dispatch = useDispatch();
	// const garden = useSelector((state) => state.garden);
	const garden = '';

	function navigateRoute(switchRoute) {
		console.log(switchRoute);
		dispatch(changeAppRoute(switchRoute));
	}

	return (
		<>
			<div className="logo">FLORA</div>

			<div className="Homepage">
				<div className="card">
					<button onClick={() => navigateRoute('garden')}>
						<div className="card-title card-main">
							<h2>GARDEN</h2>
							<p className="card-icon">🪴</p>
						</div>
					</button>
					<div className="card-box">
						<PlantsInGarden garden={garden}></PlantsInGarden>
					</div>
					{!garden && (
						<div className="card-info">
							<h3 className="blob lavender">No Plants in Garden</h3>
						</div>
					)}
				</div>
				<CareGuide navigateRoute={navigateRoute}></CareGuide>
				<WaterGuide navigateRoute={navigateRoute}></WaterGuide>
			</div>
		</>
	);
}

export default Homepage;
