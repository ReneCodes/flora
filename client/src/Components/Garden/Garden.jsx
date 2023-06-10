import './Garden.css';
import {useSelector, useDispatch} from 'react-redux';

function Plant({plant}) {
	console.log(plant.plant_details.watering.max);
	const {plant_name} = plant;
	const waterGuide = {
		1: ['💧', '10-14 days'],
		2: ['💧💧', '5-7 days'],
		3: ['💧💧💧', '2-3 days'],
	};
	const watering = waterGuide[plant.plant_details.watering.max];
	return (
		<div key={plant_name}>
			<div className="card-plant">
				<div className="card-img garden">
					<img src={plant.images[0].url}></img>
				</div>
				<div className="card-box-garden">
					<div className="input-garden">
						{/* TODO setting state and stuff */}
						<input
							type={'text'}
							state={plant_name}
						/>
						{/* TODO onClick handler function */}
						<button>🖋️</button>
						<p>{plant_name}</p>
					</div>
					<div className="water-garden">
						<h3>{watering[0]}</h3>
						<p>{watering[1]}</p>
					</div>
				</div>
			</div>
		</div>
	);
}

function Garden() {
	const garden = useSelector((state) => state.garden);
	console.log(garden);
	return (
		<div className="Garden">
			<div className="section-title">
				<h2>GARDEN</h2>
				<p className="section-icon">🪴</p>
			</div>
			{garden.map((plant) => {
				return (
					<Plant
						key={plant.plant_name}
						plant={plant}></Plant>
				);
			})}
		</div>
	);
}

export default Garden;
