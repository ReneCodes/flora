import React from 'react';
import './Camera.css';
import { useRef, useEffect, useState } from 'react';
import { findPlant } from '../../service/APIClient';
import { useSelector, useDispatch } from 'react-redux';
import { storeIdentResult, changeAppRoute, accessCamera } from '../../reduxFiles/actions';
import { Loader } from '../Suggestions/Suggestions';
import { RootState } from '../../reduxFiles/store';
import { IdentResponse } from '../../Types';

function Camera() {
	const dispatch = useDispatch();
	const camera = useSelector((state: RootState) => state.camera);
	const videoRef = useRef<HTMLVideoElement>(null); // grabs video elem in HTML
	const photoRef = useRef<HTMLCanvasElement>(null); // grabs canvas elem in HTML

	const [hasPhoto, setHasPhoto] = useState<boolean>(false);

	// Get Camera Access
	function getVideo() {
		const height = 1024;

		navigator.mediaDevices
			.getUserMedia({
				video: {
					height,
					width: height / (16 / 6),
				},
			})
			.then((stream: MediaStream) => {
				const video = videoRef.current;
				if (video === null) {
					return
				}
				video.srcObject = stream;
				// play once the stream is attached
				if (video.srcObject) video.play();
			})
			.catch((error) => {
				console.log(error);
			});
	}

	async function takePhoto() {
		const video = videoRef.current;
		const photo = photoRef.current;

		video?.pause();
		setHasPhoto(true);

		if (photo !== null) {
			photo.height = 1200;
			photo.width = photo.height / (16 / 8.2);
		} else {
			return
		}

		let ctx: CanvasRenderingContext2D | null = photo.getContext('2d');
		if (video) {
			ctx?.drawImage(video, 0, 0, photo.width, photo.height);
		}
		const imgDataUrl: string = photo.toDataURL('image/jpeg', 0.9);

		try {
			await findPlant(imgDataUrl).then((identResult: IdentResponse) => {
				dispatch(storeIdentResult(identResult));
				dispatch(changeAppRoute('identResult'));
				dispatch(accessCamera()); // turn on/Off
				//  clear Canvas
				ctx?.clearRect(0, 0, photo.width, photo.height);

			});
			setHasPhoto(false);
		} catch (error) {
			console.log('Error Identifying Plant', error);
		}
	}

	function takeMeHome() {
		dispatch(accessCamera());
		dispatch(changeAppRoute('home'));
	}

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
		camera ? video?.play() : video?.pause();
	}, [camera]);

	return (
		<div className="camera-component">
			{/*  */}
			<div className="camera">
				<video ref={videoRef}></video>
				<button
					className="btn-shot btn-cam"
					onClick={takePhoto}>
					<p>[ ]</p>
				</button>
				<button
					className="btn-close btn-cam"
					onClick={takeMeHome}>
					{'<-'}
				</button>
			</div>

			<div className={'result ' + (hasPhoto ? 'hasPhoto' : '')}>
				<canvas ref={photoRef}></canvas>
				<Loader />
			</div>
		</div>
	);
}

export default Camera;
