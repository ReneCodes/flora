/// <reference path="../../index.d.ts" />
import './Suggestions.css';
import { useSelector, useDispatch } from 'react-redux';

import loader from '../../assets/loader.gif';
import { RootState } from '../../reduxFiles/store';
import React from 'react';
import { IdentResponse, Image, Plant } from '../../Types';
import SinglePlant from './SinglePlant';

//**ONCE REDUCER HAS BEEN CONVERTED TO TYPESCRIPT, PLEASE REMOVE NULL FROM TYPE FROM LINES 12, 89, AND 127 */
function PlantDetector() {
	const identPlants: IdentResponse = useSelector((state: RootState) => state.identPlants);
	const { is_plant, is_plant_probability } = identPlants;
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

function SuggestionContainer(): React.JSX.Element {
	const identPlants: IdentResponse = useSelector((state: RootState) => state.identPlants);
	const { images, suggestions }: { images: Image[], suggestions: Plant[] } = identPlants;
	function plural(elem: Image[]) {
		if (elem.length > 1) return 's';
	}
	return (
		<section className="suggestion-container">
			<div className="plant-container middle">
				<p>Your Photo{plural(images)}</p>
				<div className="img-box">
					<img
						key={images[0].file_name}
						src={images[0].url}></img>
				</div>
			</div>
			<PlantDetector />
			{suggestions.map((single) => {
				return (
					<SinglePlant
						key={single.id}
						suggestion={single}
						images={images}
					/>
				);
			})}
		</section>
	);
}

export function Loader(): React.JSX.Element {
	return (
		<div className="loader">
			<img src={loader}></img>
		</div>
	);
}

function Suggestions(): React.JSX.Element {
	const identPlants: IdentResponse | null = useSelector((state: RootState) => state.identPlants);

	return (
		<section className="suggestions">
			<div className="section-title">
				<h2>SUGGESTIONS</h2>
				<p className="section-icon">📸</p>
			</div>
			{identPlants ? <SuggestionContainer /> : <Loader />}
		</section>
	);
}

export default Suggestions;
