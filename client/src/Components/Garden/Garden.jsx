import './Garden.css';
import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {changePlantName, viewPlant, unselectPlant} from '../../actions';
import {updatePlant} from '../../service/APIClient';

import Plant from '../Plant/Plant';

function PlantTile({plant, idx}) {
	const dispatch = useDispatch();

	const waterGuide = {
		1: ['💧', '10-14 days'],
		2: ['💧💧', '5-7 days'],
		3: ['💧💧💧', '2-3 days'],
	};
	// console.log('Plant:', idx);
	const {plant_name, _id, personal_name, plant_details} = plant;
	const {watering} = plant_details;
	const maxWater = waterGuide[watering.max];

	function selectPlant() {
		dispatch(viewPlant(Number(idx)));
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
		if (e.target.readOnly) updatePlant({_id, personal_name});
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
						onClick={selectPlant}></img>
				</div>
				<div className="card-box-garden">
					<div className="input-garden">
						{/* TODO setting state and stuff */}
						<input
							type={'text'}
							id={`name-field-${_id}`}
							value={personal_name}
							placeholder={plant_name.split(' ')[0]}
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
			{gardenList.map((plant, idx) => {
				return (
					<PlantTile
						key={plant._id}
						idx={idx}
						plant={plant}></PlantTile>
				);
			})}
		</>
	);
}

function Garden() {
	const plantIDX = useSelector((state) => state.plant);

	return <div className="Garden">{typeof plantIDX === 'number' ? <Plant></Plant> : <GardenTiles></GardenTiles>}</div>;
}

export default Garden;
