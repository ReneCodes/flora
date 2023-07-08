import './Plant.css';
import {useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {changePlantName, unselectPlant, attachPlantNote, changeAppRoute, deletePlantFromGarden} from '../../actions';
import {deletePlant, updatePlant} from '../../service/APIClient';
import {waterDrops} from '../../service/helper.service';

import CareGuideLink from '../Navbar/CareGuideLink';
import WaterGuideLink from '../Navbar/WaterGuideLink';

export default function Plant() {
	const dispatch = useDispatch();
	const noteFieldRef = useRef();
	const nameFieldRef = useRef();

	const plantIDX = useSelector((state) => state.plant);
	const garden = useSelector((state) => state.garden);
	const plant = garden[plantIDX];

	const {plant_name, personal_name, plant_details, _id, api_id, images, note} = plant;
	const {wiki_description, wiki_image, common_names, structured_name, watering, watering_info} = plant_details;

	const maxWater = watering ? waterDrops[watering.max] : waterDrops[2];

	function goToGarden() {
		dispatch(unselectPlant());
		dispatch(changeAppRoute('garden'));
	}

	function writeNote() {
		dispatch(attachPlantNote(noteFieldRef.current.value, plantIDX));
	}

	function changeName() {
		dispatch(changePlantName(nameFieldRef.current.value, plantIDX));
	}

	function focusOnName() {
		changeReadOnly(nameFieldRef.current);
		nameFieldRef.current.focus();
	}

	function focusOnNote() {
		changeReadOnly(noteFieldRef.current);
		noteFieldRef.current.focus();
		noteFieldRef.current.selectionStart = noteFieldRef.current.value.length;
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

	function saveUpdatedNote() {
		changeReadOnly(noteFieldRef.current);
		const note = noteFieldRef.current.value;
		if (noteFieldRef.current.readOnly) {
			if (plant._id) {
				updatePlant({_id, note});
			} else {
				updatePlant({api_id, note});
			}
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

	return (
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
			{/* Watering Tipp */}
			{watering_info && (
				<section>
					<div className="plant-container center">
						<p>Watering Tipp</p>
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
							ref={noteFieldRef}
							rows={note.length > 80 ? 5 : 3}
							value={note}
							placeholder="Add a Note"
							onChange={writeNote}
							onDoubleClick={() => changeReadOnly(noteFieldRef.current)}
							onBlur={saveUpdatedNote}
							readOnly={true}></textarea>
						<button
							className="btn"
							onClick={focusOnNote}>
							🖋️
						</button>
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
					<ul className="info names">
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
	);
}
