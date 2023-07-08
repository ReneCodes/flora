import {useSelector} from 'react-redux';
import PlantDetector from './PlantDetector';
import SinglePlant from './SinglePlant';

export default function SuggestionContainer() {
	const identPlants = useSelector((state) => state.identPlants);
	const {images, suggestions} = identPlants;

	function plural(elem) {
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
