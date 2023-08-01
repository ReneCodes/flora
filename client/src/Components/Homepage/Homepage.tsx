import './Homepage.css';
import { useSelector, useDispatch } from 'react-redux';
import { changeAppRoute, selectPlant } from '../../reduxFiles/actions';
import CareGuideLink from '../Navbar/CareGuideLink';
import WaterGuideLink from '../Navbar/WaterGuideLink';
import { RootState } from '../../reduxFiles/store';

function Homepage() {
	const dispatch = useDispatch();
	const garden = useSelector((state: RootState) => state.garden);

	function navigateRoute(switchRoute: string) {
		dispatch(changeAppRoute(switchRoute));
	}

	//moved function to component
	function ShowImage({ plantIndex }: { plantIndex: number }) {
		const image: string = garden[plantIndex].images[0].url;
		return (
			<img
				src={image}
				alt=""
				onClick={() => goToPlant(plantIndex, 'plantInfo')}></img>
		);
	}

	function goToPlant(plantIndex: number, route: string) {
		dispatch(selectPlant((plantIndex)));
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
								<ShowImage plantIndex={garden.indexOf(plant)} />
							</div>
						))}
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
