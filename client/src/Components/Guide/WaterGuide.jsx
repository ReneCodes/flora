import {useDispatch, useSelector} from 'react-redux';

function WaterGuide() {
	return (
		<div>
			<div className="section-title">
				<h2>Water Guide</h2>
				<p className="section-icon">🌊</p>
			</div>
			<article className="guide">
				<div className="intro">
					<p>There are several ways</p>
					<p>Choose what suits best for you</p>
				</div>

				<div className="instruction">
					<h3>WATER OVER THE SOIL</h3>
					<ul>
						<li>Pour water over the soil, using, for example, a watering can or put the plant directly under a tap</li>
						<li>Continue adding water to the pot until it starts to run out from the drainage holes</li>
						<li>
							If you have a tray under the pot when watering, make sure you remove all the collected water afterwards -
							never let your plant sit in water
						</li>
						<li>
							If you watered under a tap, make sure that water has stopped running out from the bottom before putting it
							back
						</li>
					</ul>
				</div>

				<div className="instruction">
					<h3>BOTTOM WATERING</h3>
					<ul>
						<li>Fill the plant tray with water</li>
						<li>Make sure the soil is in contact with the water on the tray</li>
						<li>Wait for about 10 minutes</li>
						<li>
							Feel the soil to see if it absorbed enough water {'—>'} if the soil is moist throughout, remove any excess
							water from the tray
						</li>
						<li>If it’s still dry {'—>'}add more water to the tray</li>
						<li>Wait 20 more minutes before removing the excess</li>
					</ul>
					<div className="instruction note">
						<h3>NOTE</h3>
						<p>
							Bottom watering will not wash away salts and other minerals from the soil, so make sure to also give water
							over the soil now and then.
						</p>
					</div>
				</div>

				<div className="instruction">
					<h3>WATER BATH</h3>
					<ul>
						<li>Fill a bucket or any other vessel with lukewarm water</li>
						<li>
							Lower the whole pot down in the water, and stop where the stem of the plant starts. Make sure all the soil
							is underwater
						</li>
						<li>The water will now start to bubble - wait until it stopped</li>
						<li>Lift the pot up and let the excess drain off</li>
						<li>Put your plant back in the cachepot or on the tray</li>
						<li>
							After 1 hour, check that your plant isn’t standing in water, if it is, it might get overwatered and rot
						</li>
					</ul>
				</div>
			</article>
		</div>
	);
}

export default WaterGuide;
