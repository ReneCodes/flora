import './Suggestions.css';
import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {waterDrops, cleanAndPushPlant} from '../../service/helper.service';
import {addPlantToGarden} from '../../actions';

function PlantDetector() {
	const identPlants = useSelector((state) => state.identPlants);
	const {is_plant, is_plant_probability} = identPlants;
	if (!is_plant)
		return (
			<div className="banner-box red">
				<h2>NO Plant detected</h2>
			</div>
		);
	if (is_plant && is_plant_probability < 0.6) {
		return (
			<div className="banner-box yellow">
				<h2>Could be a Plant</h2>
			</div>
		);
	}
	return (
		<div className="banner-box green">
			<h2>Plant detected</h2>
		</div>
	);
}

function PlantProbability({probability}) {
	const percent = Math.round(probability * 100);

	if (probability < 0.2) return <h2 className="blob red">Low {percent}%</h2>;
	if (probability < 0.6 && probability >= 0.2) {
		return <h2 className="blob yellow">Medium {percent}%</h2>;
	}
	return <h2 className="blob green">High {percent}%</h2>;
}

function SinglePlant({suggestion, images}) {
	const dispatch = useDispatch();
	const {plant_name, plant_details, probability} = suggestion;
	const {common_names, wiki_image, wiki_description, watering} = plant_details;
	const maxWater = waterDrops[watering.max];

	function addToMyGarden() {
		const cleanedPlant = cleanAndPushPlant(suggestion, images);
		dispatch(addPlantToGarden(cleanedPlant));
	}

	return (
		<div className="suggestion-card">
			<div className="suggestion-image">
				<h2>{plant_name}</h2>
				<img
					src={wiki_image}
					alt={`picture of ${plant_name}`}
				/>
			</div>
			<div className="propability-box">
				<h3>Propability</h3>
				<PlantProbability probability={probability}></PlantProbability>
			</div>
			<div className="propability-box">
				<h3>Watering</h3>
				<h3>{maxWater[0]}</h3>
				<h3>{maxWater[1]}</h3>
			</div>
			<div className="propability-box description">
				<h3>Description</h3>
				<p>{wiki_description.value}</p>
				<p>{wiki_description.extract}</p>
			</div>
			<button
				className="btn-add-plant"
				onClick={addToMyGarden}>
				Add To Your Garden
			</button>
		</div>
	);
}

function Suggestions() {
	const identPlants = useSelector((state) => state.identPlants);
	const {images, suggestions} = identPlants;

	function plural(elem) {
		if (elem.length > 1) return 's';
	}

	console.log(identPlants);
	return (
		<>
			<div className="section-title">
				<h2>SUGGESTION{plural(suggestions)}</h2>
				<p className="section-icon">📸</p>
			</div>
			<section className="suggestion-container">
				<div className="plant-container">
					<p>Your Photo{plural(images)}</p>
					<div className="img-box">
						{images.map((picture) => {
							return (
								<img
									key={picture.file_name}
									src={picture.url}></img>
							);
						})}
					</div>
				</div>
				<PlantDetector></PlantDetector>
				{suggestions.map((single) => {
					return (
						<SinglePlant
							key={single.id}
							suggestion={single}
							images={images}></SinglePlant>
					);
				})}
			</section>
		</>
	);
}

export default Suggestions;
