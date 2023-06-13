import {useDispatch, useSelector} from 'react-redux';

function CareGuide() {
	return (
		<div>
			<div className="section-title">
				<h2>Care Guide</h2>
				<p className="section-icon">🌱</p>
			</div>
			<article className="guide">
				<div className="intro">
					<p>Here are four different ways to clean your plant</p>
				</div>

				<div className="instruction">
					<h3>WITH A DAMP CLOTH</h3>
					<ul>
						<li>Dampen a cloth with lukewarm water</li>
						<li>
							Wipe off the dust from each leaf individually It’s important to remove dust from the leaves, so they can
							absorb sunlight.
						</li>
					</ul>
				</div>

				<div className="instruction">
					<h3>WITH A FEATHER DUSTER</h3>
					<ul>
						<li>Put your hand behind a leaf</li>
						<li>Gently brush away all the dust on the leaf with the feather duster</li>
						<li>Continue like this on all the leaves</li>
					</ul>
				</div>

				<div className="instruction">
					<h3>SHOWER THE WHOLE PLANT</h3>
					<ul>
						<li>Use either a spray bottle or place the whole plant in the shower</li>
						<li>Remember to use lukewarm water and gently remove the dust</li>
						<li>Try to avoid getting water in the soil</li>
					</ul>
				</div>

				<div className="instruction">
					<h3>DIP IT</h3>
					<ul>
						<li>Fill a bucket with lukewarm water</li>
						<li>Take hold of the pot and lower the top of the plant in the water</li>
						<li>Gently swirl it around and let it drip off before putting it back</li>
					</ul>
				</div>

				<div className="guide">
					<div className="intro">
						<h3>WHY IT’S IMPORTANT TO CLEAN YOUR HOUSEPLANTS</h3>
					</div>
					<p className="info">
						Removing dust and dirt from your leaves is important for your plant to be able to absorb sunlight. Plants
						use light to convert carbon dioxide and water into energy (sugar). The plant stores the sugar in the stem,
						leaves, roots and fruits - from which it then uses it to grow. It’s also in this process that oxygen is made
						- which is great for us and our homes! If the leaves are covered with dust, your plant can’t collect enough
						light needed for this process - called photosynthesis - and your plant will starve.
					</p>
				</div>
			</article>
		</div>
	);
}

export default CareGuide;
