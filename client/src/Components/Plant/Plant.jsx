import './Plant.css';
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {changePlantName, unselectPlant, attachPlantNote, changeAppRoute} from '../../actions';
import {updatePlant} from '../../service/APIClient';
import {WaterGuide, CareGuide} from '../Homepage/Homepage';
import {waterDrops} from '../../service/helper.service';

function Plant() {
	const plantIDX = useSelector((state) => state.plant);
	const garden = useSelector((state) => state.garden);
	const {plant_name, personal_name, plant_details, _id, images, note} = garden[plantIDX];
	const {
		wiki_description,
		common_names,
		taxonomy,
		synonyms,
		edible_parts,
		structured_name,
		watering,
		propagation_methods,
	} = plant_details;

	const dispatch = useDispatch();
	const maxWater = waterDrops[watering.max];
	let inputfield = '';
	let notefield = '';

	function goToGarden() {
		dispatch(unselectPlant());
		dispatch(changeAppRoute('garden'));
	}

	function writeNote(e) {
		if (e.target.localName === 'button') {
			notefield.readOnly = false;
			notefield.focus();
			notefield.selectionStart = notefield.value.length;
		} else {
			dispatch(attachPlantNote(e.target.value, plantIDX));
		}
	}

	function changeName(e) {
		if (e.target.localName === 'button') {
			inputfield.readOnly = false;
			inputfield.focus();
		} else {
			dispatch(changePlantName(e.target.value, plantIDX));
		}
	}
	function writeTrueFalse(e) {
		if (e.target.localName === 'textarea') {
			const note = e.target.value;
			e.target.readOnly = !e.target.readOnly;
			// update note onBlur
			if (e.target.readOnly) updatePlant({_id, note});
		}
		if (e.target.localName === 'input') {
			const personal_name = e.target.value;
			e.target.readOnly = !e.target.readOnly;
			// update personal_name onBlur
			if (e.target.readOnly) updatePlant({_id, personal_name});
		}
	}

	useEffect(() => {
		inputfield = document.getElementById(`name-field-${_id}`);
		notefield = document.getElementById(`plant-note-${_id}`);
	}, []);

	return (
		<>
			<div className="Plant">
				<section className="PlantHead">
					<button onClick={goToGarden}>
						<span route="garden">{'<-'}</span>
					</button>
					<div className="card-img plant">
						<img
							src={images[0].url}
							alt={`picture of ${plant_name}`}></img>
					</div>
					<div className="input-garden">
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
						<button onClick={changeName}>🖋️</button>
						<p>{plant_name}</p>
					</div>
				</section>
				{/* Water info */}
				<section>
					<div className="plant-container">
						{/* TODO insert edible_parts and propagation */}
						<h3>Overview</h3>
						<div className="water-garden">
							<h3>{maxWater[0]}</h3>
							<h4>{maxWater[1]}</h4>
						</div>
					</div>
				</section>

				{/* Notefield */}
				<section>
					<div className="plant-container">
						<h3>Notes</h3>
						<div className="note-plant">
							<textarea
								id={`plant-note-${_id}`}
								rows={note.length > 80 ? 5 : 3}
								value={note}
								placeholder="Add a Note"
								onChange={writeNote}
								onDoubleClick={writeTrueFalse}
								onBlur={writeTrueFalse}
								readOnly={true}></textarea>
							<button onClick={writeNote}>🖋️</button>
						</div>
					</div>
				</section>
				{/* Description */}
				<section>
					<div className="plant-container">
						<h3>Description</h3>
						<p>Type</p>
						<p className="blob blue">{wiki_description.value}</p>
						<p>{wiki_description.extract}</p>
					</div>
				</section>
				{/* Common Names */}
				<section>
					<div className="plant-container">
						<p>Common Names</p>
						<ul>
							{common_names ? (
								common_names.map((elem) => (
									<li
										key={elem}
										className="blob">
										{' ' + elem}{' '}
									</li>
								))
							) : (
								<li className="blob red">{' ' + 'none'} </li>
							)}
						</ul>
					</div>
				</section>
				{/* Family */}
				<section>
					<div className="plant-container">
						<p>Family</p>
						<ul>
							<li className="blob full">
								<span className="blob green">Genus</span>
								{' ' + structured_name.genus}
							</li>
							<li className="blob full">
								<span className="blob blue">Species</span>
								{' ' + structured_name.species}{' '}
							</li>
						</ul>
					</div>
				</section>
				{/* Articles */}
				<section>
					<div className="article-container">
						<h3>Articles</h3>
						<CareGuide></CareGuide>
						<WaterGuide></WaterGuide>
					</div>
				</section>
			</div>
		</>
	);
}

export default Plant;
