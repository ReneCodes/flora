import './Garden.css';
import {useSelector, useDispatch} from 'react-redux';
import {changePlantName} from '../../actions';

function Plant({plant, idx}) {
	const dispatch = useDispatch();
	const waterGuide = {
		1: ['💧', '10-14 days'],
		2: ['💧💧', '5-7 days'],
		3: ['💧💧💧', '2-3 days'],
	};
	// console.log('Plant:', idx);
	const {plant_name, id, personal_name, plant_details} = plant;
	const {watering} = plant_details;
	const maxWater = waterGuide[watering.max];

	function changeName(e) {
		if (e.target.localName === 'button') {
			const input = document.getElementById(`name-field-${id}`);
			input.readOnly = false;
			input.focus();
			console.dir(input);
		} else {
			dispatch(changePlantName(e.target.value, idx));
		}
	}

	function writeTrue(e) {
		e.target.readOnly = false;
	}
	function writeFalse(e) {
		e.target.readOnly = true;
	}

	return (
		<div key={id}>
			<div className="card-plant">
				<div className="card-img garden">
					<img src={plant.images[0].url}></img>
				</div>
				<div className="card-box-garden">
					<div className="input-garden">
						{/* TODO setting state and stuff */}
						<input
							type={'text'}
							id={`name-field-${id}`}
							value={personal_name}
							onChange={changeName}
							onDoubleClick={writeTrue}
							onBlur={writeFalse}
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

function Garden() {
	const garden = useSelector((state) => state.garden);
	const plantKeys = Object.keys(garden);

	return (
		<div className="Garden">
			<div className="section-title">
				<h2>GARDEN</h2>
				<p className="section-icon">🪴</p>
			</div>
			{garden.map((plant, idx) => {
				return (
					<Plant
						key={plant.id}
						idx={idx}
						plant={plant}></Plant>
				);
			})}
		</div>
	);
}

export default Garden;
