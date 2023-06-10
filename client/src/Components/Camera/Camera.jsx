import './Camera.css';
import {useRef, useEffect, useState} from 'react';
import {findPLant} from '../../service/APIClient'; // TODO: activate func in camera
import {useSelector, useDispatch} from 'react-redux';

function Camera() {
	const videoRef = useRef(null); // grabs video elem in HTML
	const photoRef = useRef(null); // grabs canvas elem in HTML
	const camera = useSelector((state) => state.camera);

	const [hasPhoto, setHasPhoto] = useState(false);

	// Get Camera Access
	const getVideo = () => {
		const height = 1024;
		navigator.mediaDevices
			.getUserMedia({
				video: {
					height,
					width: height / (16 / 9),
				},
			})
			.then((stream) => {
				let video = videoRef.current;
				video.load(); // preload camera
				video.srcObject = stream;
				// play once the stream is attached
				if (video.srcObject) video.play();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const takePhoto = () => {
		// const width = 768;
		// const height = width / (16 / 9); // get 16:9 ratio *Experimental
		const height = 1024;
		const width = 768;

		let video = videoRef.current;
		let photo = photoRef.current;

		photo.width = width;
		photo.height = height;

		let ctx = photo.getContext('2d');
		ctx.drawImage(video, 0, 0, width, height);

		video.pause();

		const imgDataUrl = photo.toDataURL('image/jpeg', 0.9);

		const saveImage = document.getElementById('canvasDownload');
		saveImage.href = imgDataUrl;

		/** Example to Download image
		 
		 <a id="canvasDownload" href='#' download="canvas-image.png"  >Download Image</a>
		 
		  const saveImage = document.getElementById('canvasDownload');
		  const pngDataUrl = photo.toDataURL('image/png');
		 
		  saveImage.href = pngDataUrl;
		 
		 * */

		setHasPhoto(true);
	};

	const closePhoto = () => {
		let video = videoRef.current;
		let photo = photoRef.current;
		let ctx = photo.getContext('2d');

		//  clear Canvas
		ctx.clearRect(0, 0, photo.width, photo.height);
		setHasPhoto(false);

		video.play();
	};

	// Init video after rendering component
	useEffect(() => {
		getVideo();
	}, []);

	// Pause Camera when not needed
	useEffect(() => {
		let video = videoRef.current;
		camera ? video.play() : video.pause();
	}, [camera]);

	return (
		<div className="Camera">
			<div>
				<div className="camera">
					<video ref={videoRef}></video>
					<button
						className="btn-cam btn-snap"
						onClick={takePhoto}>
						SNAP
					</button>
				</div>
				<div className={'result ' + (hasPhoto ? 'hasPhoto' : '')}>
					<canvas ref={photoRef}></canvas>
					<button
						className="btn-cam btn-close"
						onClick={closePhoto}>
						CLOSE
					</button>
					<button className="btn-cam btn-save">
						<a
							id="canvasDownload"
							href="#"
							download="canvas-image.jpeg">
							Download Image
						</a>
					</button>
				</div>
			</div>
		</div>
	);
}

export default Camera;
