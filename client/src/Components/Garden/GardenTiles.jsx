import {useSelector} from 'react-redux';
import PlantTile from './PlantTile';

export default function GardenTiles() {
	const gardenList = useSelector((state) => state.garden);

	return (
		<>
			<div className="section-title">
				<h2>GARDEN</h2>
				<p className="section-icon">🪴</p>
			</div>
			{gardenList ? (
				gardenList.map((plant, idx) => {
					const identKey = plant._id ? plant._id : idx;
					return (
						<PlantTile
							key={identKey}
							idx={idx}
							plant={plant}></PlantTile>
					);
				})
			) : (
				<h3>No plant in Garden</h3>
			)}
		</>
	);
}
