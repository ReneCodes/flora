import './Garden.css';
import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changePlantName, viewPlant, unselectPlant, changeAppRoute } from '../../actions';
import { updatePlant } from '../../service/APIClient';
import { waterDrops } from '../../service/helper.service';
import { RootState } from '../../store';
import PlantComponent from '../Plant/Plant';
import { Plant } from '../../Types';

function PlantTile({ plant, idx }: { plant: Plant, idx: number }) {
	const dispatch = useDispatch();

	// console.log('Plant:', idx);
	const { plant_name, _id, api_id, personal_name, plant_details } = plant;
	const { watering } = plant_details;
	const maxWater = watering ? waterDrops[watering.max] : waterDrops[2];

	function selectPlant(e: React.MouseEvent<HTMLImageElement, globalThis.MouseEvent>) {
		dispatch(viewPlant(Number(idx)));
		dispatch(changeAppRoute('plantInfo'));
	}

	function changeName(e: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
		if ((e.target as HTMLElement).localName === 'button') {
			const input = document.getElementById(`name-field-${_id}`) as HTMLInputElement;
			input.readOnly = false;
			input.focus();
		} else {
			dispatch(changePlantName((e.target as HTMLInputElement).value, idx));
		}
	}

	async function writeTrueFalse(e: React.FocusEvent<HTMLInputElement, Element> | React.MouseEvent<HTMLInputElement, globalThis.MouseEvent>) {
		const inputElement = e.target as HTMLInputElement;
		const personal_name: string = inputElement.value;
		inputElement.readOnly = !inputElement.readOnly;

		if (inputElement.readOnly) {
			if (plant._id) updatePlant({ _id, personal_name });
			else updatePlant({ api_id, personal_name });
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
						onClick={selectPlant}></img>
				</div>
				<div className="card-box-garden">
					<div className="input-garden">
						<input
							type={'text'}
							id={`name-field-${_id}`}
							value={personal_name}
							onChange={changeName}
							onDoubleClick={writeTrueFalse}
							onBlur={writeTrueFalse}
							readOnly={true}
						/>
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
	const gardenList = useSelector((state: RootState) => state.garden);

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
	const route = useSelector((state: RootState) => state.basicRouting);
	const currentRoute: string = route[0];
	const plantIDX = useSelector((state: RootState) => state.plant);

	return (
		<>
			<div>
				<div className="garden">
					{' '}
					{typeof plantIDX === 'number' && currentRoute === 'plantInfo' ? <PlantComponent></PlantComponent> : <GardenTiles></GardenTiles>}
				</div>
			</div>
		</>
	);
}

export default Garden;
