import {useSelector, useDispatch} from 'react-redux';
import {changeAppRoute} from '../../actions';

export default function CareGuideLink() {
	const dispatch = useDispatch();

	return (
		<button onClick={() => dispatch(changeAppRoute('careGuide'))}>
			{' '}
			<div className="card">
				<div className="card-title">
					<h2>CARE GUIDE</h2>
					<p className="card-icon wobble">🌱</p>
				</div>
			</div>
		</button>
	);
}
