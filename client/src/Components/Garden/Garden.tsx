import './Garden.css';
// import React from 'react';
// import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { updatePlant } from '../../service/APIClient';
// import { waterDrops } from '../../service/helper.service';
import { RootState } from '../../reduxFiles/store';
// import PlantInfo from '../Plant/PlantInfo';
// import { Plant } from '../../Types';
import PlantTile from './PlantTile'

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
						gardenList.map((plant, plantIndex) => {
							const identKey = plant._id ? plant._id : plantIndex;
							return (
								<PlantTile
									key={identKey}
									plantIndex={plantIndex}
									plant={plant}></PlantTile>
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
