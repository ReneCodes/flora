import './Garden.css';
import {useSelector} from 'react-redux';

import Plant from '../Plant/Plant';
import GardenTiles from './GardenTiles';

function Garden() {
	const route = useSelector((state) => state.basicRouting);
	const currentRoute = route[0];
	const plantIDX = useSelector((state) => state.plant);

	return (
		<>
			<div>
				<div className="garden">
					{typeof plantIDX === 'number' && currentRoute === 'plantInfo' ? <Plant /> : <GardenTiles />}
				</div>
			</div>
		</>
	);
}

export default Garden;
