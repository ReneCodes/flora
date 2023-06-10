import './Camera.css';
import {useRef, useEffect, useState} from 'react';
import {findPLant} from '../../service/APIClient'; // TODO: activate func in camera
import {useSelector, useDispatch} from 'react-redux';

function Camera() {
	const videoRef = useRef(); // grabs video elem in HTML
	const photoRef = useRef(); // grabs canvas elem in HTML
	const camera = useSelector((state) => state.camera);

	const [hasPhoto, setHasPhoto] = useState(false);

	// Get Camera Access
	const getVideo = () => {
		const height = 1024;

		navigator.mediaDevices
			.getUserMedia({
				video: {
					height,
					width: height / (16 / 6),
				},
			})
			.then((stream) => {
				const video = videoRef.current;
				video.srcObject = stream;
				// play once the stream is attached
				if (video.srcObject) video.play();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const takePhoto = () => {
		let video = videoRef.current;
		let photo = photoRef.current;

		photo.height = 1200;
		photo.width = photo.height / (16 / 8.2);

		let ctx = photo.getContext('2d');
		ctx.drawImage(video, 0, 0, photo.width, photo.height);

		video.pause();

		const imgDataUrl = photo.toDataURL('image/jpeg', 0.9);

		const saveImage = document.getElementById('canvasDownload');
		saveImage.href = imgDataUrl;

		setHasPhoto(true);
	};

	const closePhoto = () => {
		// const video = videoRef.current;
		const photo = photoRef.current;
		const ctx = photo.getContext('2d');

		const imgDataUrl = photo.toDataURL('image/jpeg', 0.9);
		findPLant(imgDataUrl);
		// console.log(imgDataUrl);

		//  clear Canvas
		ctx.clearRect(0, 0, photo.width, photo.height);
		setHasPhoto(false);
		video.play();
	};

	// Init video after rendering component
	useEffect(() => {
		const video = videoRef.current;
		if (video) {
			video.load();
			getVideo();
		}
	}, []);

	// Pause Camera when not needed
	useEffect(() => {
		let video = videoRef.current;
		camera ? video.play() : video.pause();
	}, [camera]);

	return (
		<div className="Camera">
			{/*  */}

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
				<DownloadButton></DownloadButton>
			</div>
		</div>
	);
}

function DownloadButton() {
	return (
		<button className="btn-cam btn-save">
			<a
				id="canvasDownload"
				href="#"
				download="canvas-image.jpeg">
				Download Image
			</a>
		</button>
	);
}

/** Example to Download image
		 <a id="canvasDownload" href='#' download="canvas-image.png"  >Download Image</a>
		 const saveImage = document.getElementById('canvasDownload');
		 const pngDataUrl = photo.toDataURL('image/png');
		 saveImage.href = pngDataUrl;
* */

export default Camera;
