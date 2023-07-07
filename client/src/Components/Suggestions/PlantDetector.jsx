import {useSelector} from 'react-redux';

export default function PlantDetector() {
	const identPlants = useSelector((state) => state.identPlants);
	const {is_plant, is_plant_probability} = identPlants;
	if (!is_plant)
		return (
			<div className="banner-box red">
				<h2>NO Plant detected</h2>
			</div>
		);
	if (is_plant && is_plant_probability < 0.6) {
		return (
			<div className="banner-box yellow">
				<h2>Could be a Plant</h2>
			</div>
		);
	}
	return (
		<div className="banner-box green">
			<h2>Plant detected</h2>
		</div>
	);
}
