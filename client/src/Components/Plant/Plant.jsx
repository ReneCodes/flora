import './Plant.css';
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {changePlantName, unselectPlant, attachPlantNote, changeAppRoute, deletePlantFromGarden} from '../../actions';
import {deletePlant, updatePlant} from '../../service/APIClient';
import CareGuideLink from '../Navbar/CareGuideLink';
import WaterGuideLink from '../Navbar/WaterGuideLink';
import {waterDrops} from '../../service/helper.service';

function Plant() {
	const plantIDX = useSelector((state) => state.plant);
	const garden = useSelector((state) => state.garden);
	const {plant_name, personal_name, plant_details, _id, api_id, images, note} = garden[plantIDX];
	const {
		wiki_description,
		wiki_image,
		common_names,
		taxonomy,
		synonyms,
		edible_parts,
		structured_name,
		watering,
		watering_info,
		propagation_methods,
	} = plant_details;

	const dispatch = useDispatch();
	const maxWater = watering ? waterDrops[watering.max] : waterDrops[2];
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

	async function deleteThisPlant() {
		try {
			await (_id ? deletePlant({_id}) : deletePlant({api_id})).then(() => {
				dispatch(deletePlantFromGarden(Number(plantIDX)));
				goToGarden();
			});
		} catch (error) {
			console.log('Error deleting Plant', error);
		}
	}

	useEffect(() => {
		inputfield = document.getElementById(`name-field-${_id}`);
		notefield = document.getElementById(`plant-note-${_id}`);
	}, []);

	return (
		<>
			<div className="plant-component">
				<section className="plantHead">
					<button
						className="btn-back"
						onClick={goToGarden}>
						<span route="garden">{'<-'}</span>
					</button>
					<div className="card-img-plant">
						<div className="card-img">
							<img
								src={images[0].url}
								alt={plant_name}></img>
						</div>
						<div className="card-img">
							<img
								src={wiki_image}
								alt={plant_name}></img>
						</div>
					</div>
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
				</section>
				{/* Water info */}
				<section>
					<div className="plant-container">
						<h3>Overview</h3>
						<div className="water-garden">
							<h3>{maxWater[0]}</h3>
							<h4>{maxWater[1]}</h4>
						</div>
					</div>
				</section>
				{/* Watering Info */}
				{watering_info && (
					<section>
						<div className="plant-container center">
							{/* TODO insert edible_parts and propagation */}
							<p>Watering Tip</p>
							<p>{watering_info}</p>
						</div>
					</section>
				)}

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
						<p className="info">{wiki_description.extract}</p>
					</div>
				</section>
				{/* Common Names */}
				<section>
					<div className="plant-container">
						<p>Common Names</p>
						<ul className="info">
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
						<ul className="info">
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
				{/* Danger Zone */}
				<section>
					<div className="plant-container ">
						<h3>Danger Zone</h3>
						<div className="danger">
							<button
								className="btn-delete blob"
								onClick={deleteThisPlant}>
								Delete Plant
							</button>
						</div>
					</div>
				</section>
				{/* Articles */}
				<section>
					<div className="article-container">
						<h2>Articles</h2>
						<CareGuideLink />
						<WaterGuideLink />
					</div>
				</section>
			</div>
		</>
	);
}

export default Plant;
