import './Garden.css';
// import React from 'react';
// import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { changePlantName, viewPlant, unselectPlant, changeAppRoute } from '../../actions';
// import { updatePlant } from '../../service/APIClient';
// import { waterDrops } from '../../service/helper.service';
import { RootState } from '../../store';
import PlantComponent from '../Plant/Plant';
// import { Plant } from '../../Types';
import GardenTile from './PlantTile'

// function GardenTiles() {
// 	const gardenList = useSelector((state: RootState) => state.garden);

// 	return (
// 		<>
// 			<div className="section-title">
// 				<h2>GARDEN</h2>
// 				<p className="section-icon">🪴</p>
// 			</div>
// 			{gardenList ? (
// 				gardenList.map((plant, idx) => {
// 					const identKey = plant._id ? plant._id : idx;
// 					return (
// 						<PlantTile
// 							key={identKey}
// 							idx={idx}
// 							plant={plant}></PlantTile>
// 					);
// 				})
// 			) : (
// 				<h3>No plant in Garden</h3>
// 			)}
// 		</>
// 	);
// }

function Garden() {
	const route = useSelector((state: RootState) => state.basicRouting);
	const currentRoute: string = route[0];
	const plantIDX = useSelector((state: RootState) => state.plant);
	const gardenList = useSelector((state: RootState) => state.garden);

	return (
		<>
			<div>
				<div className="section-title">
					<h2>GARDEN</h2>
					<p className="section-icon">🪴</p>
				</div>
				<div className="garden">
					{' '}
					{gardenList ? (
						gardenList.map((plant, idx) => {
							const identKey = plant._id ? plant._id : idx;
							return (
								<GardenTile
									key={identKey}
									idx={idx}
									plant={plant}></GardenTile>
							);
						})
					) : (
						<h3>No plant in Garden</h3>
					)}
				</div>
			</div>
		</>
	);
}

export default Garden;
