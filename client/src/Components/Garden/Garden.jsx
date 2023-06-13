import './Garden.css';
import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {changePlantName, viewPlant, unselectPlant, changeAppRoute} from '../../actions';
import {updatePlant} from '../../service/APIClient';
import {waterDrops} from '../../service/helper.service';

import Plant from '../Plant/Plant';

function PlantTile({plant, idx}) {
	const dispatch = useDispatch();

	// console.log('Plant:', idx);
	const {plant_name, _id, api_id, personal_name, plant_details} = plant;
	const {watering} = plant_details;
	const maxWater = watering ? waterDrops[watering.max] : waterDrops[2];

	function selectPlant(e) {
		dispatch(viewPlant(Number(idx)));
		const route = e.target.attributes.route.value;
		dispatch(changeAppRoute(route));
	}

	function changeName(e) {
		if (e.target.localName === 'button') {
			const input = document.getElementById(`name-field-${_id}`);
			input.readOnly = false;
			input.focus();
		} else {
			dispatch(changePlantName(e.target.value, idx));
		}
	}

	function writeTrueFalse(e) {
		const personal_name = e.target.value;
		e.target.readOnly = !e.target.readOnly;
		if (e.target.readOnly) {
			if (plant._id) updatePlant({_id, personal_name});
			else updatePlant({api_id, personal_name});
		}
	}

	useEffect(() => {
		dispatch(unselectPlant());
	}, []);

	return (
		<div key={_id}>
			<div className="card-plant">
				<div className="card-img garden">
					<img
						src={plant.images[0].url}
						alt={`picture of ${plant_name}`}
						route="plantInfo"
						onClick={selectPlant}></img>
				</div>
				<div className="card-box-garden">
					<div className="input-garden">
						{/* TODO setting state and stuff */}
						<input
							type={'text'}
							id={`name-field-${_id}`}
							value={personal_name}
							onChange={changeName}
							onDoubleClick={writeTrueFalse}
							onBlur={writeTrueFalse}
							readOnly={true}
						/>
						{/* TODO onClick handler function */}
						<button onClick={changeName}>🖋️</button>
						<p>{plant_name}</p>
					</div>
					<div className="water-garden">
						<h3>{maxWater[0]}</h3>
						<p>{maxWater[1]}</p>
					</div>
				</div>
			</div>
		</div>
	);
}

function GardenTiles() {
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

function Garden() {
	const route = useSelector((state) => state.basicRouting);
	const currentRoute = route[0];
	const plantIDX = useSelector((state) => state.plant);

	return (
		<div className="Garden">
			{typeof plantIDX === 'number' && currentRoute === 'plantInfo' ? <Plant></Plant> : <GardenTiles></GardenTiles>}
		</div>
	);
}

export default Garden;
