import './Garden.css';

function Garden() {
	return (
		<div className="Garden">
			<div className="card-title">
				<h2>GARDEN</h2>
				<p className="card-icon">🪴</p>
			</div>
			<div className="card-plant">
				<div className="card-img garden">
					<img src={''}></img>
				</div>
				<div className="card-box-garden">
					<div className="input-garden">
						<input type="text" />
						<button>🖋️</button>
						<p>SCIENTIFIC NAME</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Garden;
