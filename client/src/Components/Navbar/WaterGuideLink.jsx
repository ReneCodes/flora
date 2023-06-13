import {useDispatch} from 'react-redux';
import {changeAppRoute} from '../../actions';

export default function WaterGuideLink() {
	const dispatch = useDispatch();
	return (
		<button onClick={() => dispatch(changeAppRoute('waterGuide'))}>
			<div className="card">
				<div className="card-title">
					<h2>WATER GUIDE</h2>
					<p className="card-icon wobble">🌊</p>
				</div>
			</div>
		</button>
	);
}
