import './Suggestions.css';
import {useSelector} from 'react-redux';
import Loader from '../Loader/Loader';

import SuggestionContainer from './SuggestionContainer';

function Suggestions() {
	const identPlants = useSelector((state) => state.identPlants);

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
