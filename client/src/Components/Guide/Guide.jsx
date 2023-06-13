import './Guide.css';
import {useDispatch, useSelector} from 'react-redux';
import CareGuideLink from '../Navbar/CareGuideLink';
import WaterGuideLink from '../Navbar/WaterGuideLink';

function Guide() {
	return (
		<div className="guide-component">
			<div className="section-title">
				<h2>Helper Guides</h2>
				<p className="section-icon">🧑‍🌾</p>
			</div>
			<CareGuideLink />
			<WaterGuideLink />
		</div>
	);
}

export default Guide;
