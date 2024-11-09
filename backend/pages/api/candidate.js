'use client'
import React, { useRef, useState } from 'react'; 
const ScreenRecorder = () => { 

	/* Create a reference to the video element, 
	which helps in storing continous video stream 
	irespective of multiple renders. */
	const screenRecording = useRef(null); 

	const [Recorder, setRecorder] = useState(null); 
	const [displayMedia, setDisplayMedia] = useState(null); 
	const startScreenRecording = async () => { 
		const stream = await navigator.mediaDevices.getDisplayMedia({ 
			audio: true, video: true
		}); 
		const recorder = new MediaRecorder(stream); 
		setRecorder(recorder); 
		setDisplayMedia(stream.getVideoTracks()[0]); 
		const screenRecordingChunks = []; 
		recorder.ondataavailable = (e) => { 
			if (e.data.size > 0) { 
				screenRecordingChunks.push(e.data); 
			} 
		} 
		recorder.onstop = () => { 
			//onstop event of media recorder 
			const blob = new Blob(screenRecordingChunks, 
				{ type: 'video/webm' }); 
			const url = URL.createObjectURL(blob); 
			screenRecording.current.src = url; 
			if (displayMedia) { 
				displayMedia.stop(); 
			} 
		} 
		//Start the recording. 
		recorder.start(); 
	} 
	// Style the Button 
	const ButtonStyle = { 
		backgroundColor: 'green', 
		color: 'white', 
		fontSize: '2em', 
	}; 

	return ( 
		<> 
			<button style={ButtonStyle} onClick={() => 
						startScreenRecording()}> 
				Start Recording 
			</button> 
			<button style={ButtonStyle} onClick={() => 
						{ Recorder && Recorder.stop() }}> 
				Stop Recording 
			</button> 
			<br /><br /><br /> 
			<video ref={screenRecording} 
				height={300} 
				width={600} controls /> 
		</> 
	); 
}; 
export default ScreenRecorder;