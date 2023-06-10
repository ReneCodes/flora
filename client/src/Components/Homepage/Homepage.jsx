import './Homepage.css';
import ansel from '../../assets/ansel.jpg';
import julia from '../../assets/julia.jpg';

function Homepage() {
	return (
		<div className="Homepage">
			<div className="card">
				<div className="card-title card-main">
					<h2>GARDEN</h2>
					<p className="card-icon">🪴</p>
				</div>
				<div className="card-box">
					<div className="card-img">
						<img src={ansel}></img>
					</div>
					<div className="card-img">
						<img src={julia}></img>
					</div>
				</div>
			</div>
			<div className="card">
				<div className="card-title">
					<h2>CARE GUIDE</h2>
					<p className="card-icon">🌱</p>
				</div>
			</div>
			<div className="card">
				<div className="card-title">
					<h2>WATER GUIDE</h2>
					<p className="card-icon">🌊</p>
				</div>
			</div>
		</div>
	);
}

export default Homepage;
