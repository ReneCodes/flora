import {useEffect, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {changePlantName, viewPlant, unselectPlant, changeAppRoute} from '../../actions';
import {updatePlant} from '../../service/APIClient';
import {waterDrops} from '../../service/helper.service';

export default function PlantTile({plant, idx}) {
	const nameFieldRef = useRef();
	const dispatch = useDispatch();

	const {plant_name, _id, api_id, personal_name, plant_details} = plant;
	const {watering} = plant_details;
	const maxWater = watering ? waterDrops[watering.max] : waterDrops[2];

	function selectPlant(e) {
		dispatch(viewPlant(Number(idx)));
		const route = e.target.attributes.route.value;
		dispatch(changeAppRoute(route));
	}

	function focusOnName() {
		changeReadOnly(nameFieldRef.current);
		nameFieldRef.current.focus();
	}

	function changeName() {
		dispatch(changePlantName(nameFieldRef.current.value, idx));
	}

	function changeReadOnly(currentField) {
		currentField.readOnly = !currentField.readOnly;
	}

	function saveUpdatedName() {
		changeReadOnly(nameFieldRef.current);
		const personal_name = nameFieldRef.current.value;
		if (nameFieldRef.current.readOnly) {
			if (plant._id) {
				updatePlant({_id, personal_name});
			} else {
				updatePlant({api_id, personal_name});
			}
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
						<input
							ref={nameFieldRef}
							type={'text'}
							value={personal_name}
							onChange={changeName}
							onDoubleClick={() => changeReadOnly(nameFieldRef.current)}
							onBlur={saveUpdatedName}
							readOnly={true}
						/>
						<button
							className="btn"
							onClick={focusOnName}>
							🖋️
						</button>
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
