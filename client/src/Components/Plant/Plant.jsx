import './Plant.css';
import {useSelector, useDispatch} from 'react-redux';
import {changePlantName, unselectPlant} from '../../actions';
import {updatePlant} from '../../service/APIClient';

function Plant() {
	const plant = useSelector((state) => state.plant);
	const {plant_name, personal_name, plant_details} = plant;
	const dispatch = useDispatch();
	function goToGarden() {
		dispatch(unselectPlant());
	}
	console.log(plant_name);

	return (
		<>
			<div className="Plant">
				<button onClick={goToGarden}>{'<-'}</button>
				<img></img>
				<h2>{plant_name}</h2>
			</div>
		</>
	);
}

export default Plant;
