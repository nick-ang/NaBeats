import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

// style
const pointer = { cursor: "pointer" };

const Player = ({
	currentSong,
	setCurrentSong,
	isPlaying,
	setIsPlaying,
	audioRef,
	songInfo,
	setSongInfo,
	songs,
	setSongs,
}) => {
	// Event handlers
	const playSongHandler = () => {
		if (isPlaying) {
			audioRef.current.pause();
			setIsPlaying(!isPlaying);
		} else {
			audioRef.current.play();
			setIsPlaying(!isPlaying);
		}
	};

	const togglePlayPauseIcon = () => {
		if (isPlaying) {
			return faPause;
		} else {
			return faPlay;
		}
	};

	const getTime = (time) => {
		let minute = Math.floor(time / 60);
		let second = ("0" + Math.floor(time % 60)).slice(-2);
		return `${minute}:${second}`;
	};

	const dragHandler = (e) => {
		audioRef.current.currentTime = e.target.value;
		setSongInfo({ ...songInfo, currentTime: e.target.value });
	};

	const skipTrackHandler = async (direction) => {
		let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
		if (direction === "skip-forward") {
			await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
			activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
		} else if (direction === "skip-back") {
			if ((currentIndex - 1) % songs.length === -1) {
				await setCurrentSong(songs[songs.length - 1]);
				activeLibraryHandler(songs[songs.length - 1]);
			} else {
				await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
				activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
			}
		}
		if (isPlaying) {
			audioRef.current.play();
		}
	};

	const activeLibraryHandler = (newSong) => {
		const newSongs = songs.map((song) => {
			if (song.id === newSong.id) {
				return {
					...song,
					active: true,
				};
			} else {
				return {
					...song,
					active: false,
				};
			}
		});
		setSongs(newSongs);
	};

	return (
		<PlayerContainer>
			<PlayControlContainer>
				<FontAwesomeIcon
					onClick={() => skipTrackHandler("skip-back")}
					className="skip-back"
					icon={faAngleLeft}
					size="1.5x" // Slightly smaller icon size for compactness on mobile
					style={pointer}
				/>
				<FontAwesomeIcon
					onClick={playSongHandler}
					className="play"
					icon={togglePlayPauseIcon()}
					size="1.5x" // Slightly smaller icon size for compactness on mobile
					style={pointer}
				/>
				<FontAwesomeIcon
					onClick={() => skipTrackHandler("skip-forward")}
					className="skip-forward"
					icon={faAngleRight}
					size="1.5x" // Slightly smaller icon size for compactness on mobile
					style={pointer}
				/>
			</PlayControlContainer>

			{/* Time control and track bar should be placed below play controls on mobile */}
			<TimeControlContainer>
				<P>{getTime(songInfo.currentTime || 0)}</P>
				<Track currentSong={currentSong}>
					<Input
						onChange={dragHandler}
						min={0}
						max={songInfo.duration || 0}
						value={songInfo.currentTime}
						type="range"
					/>
					<AnimateTrack songInfo={songInfo}></AnimateTrack>
				</Track>
				<P>{getTime(songInfo.duration || 0)}</P>
			</TimeControlContainer>
		</PlayerContainer>
	);
};

const PlayerContainer = styled.div`
	min-height: 5vh;
	justify-content: space-evenly;
	display: flex;
	flex-direction: row;
	flex: 0 0 75%;
	width: 100%;
	@media screen and (max-width: 768px) {
		flex-direction: column; /* Stack elements vertically on mobile */
		align-items: center;
		padding: 8px;
	}
`;

const TimeControlContainer = styled.div`
	width: 50%;
	display: flex;
	align-items: center;
	@media screen and (max-width: 768px) {
		width: 90%; /* Make track container take up most of the screen on mobile */
		margin-top: 10px; /* Space between controls and slider */
		padding-bottom: 15px; /* Add more padding to the bottom */
	}
`;

const Track = styled.div`
	background: lightblue;
	width: 100%;
	height: 1rem;
	position: relative;
	border-radius: 1rem;
	overflow: hidden;
	background: linear-gradient(to right, ${(p) => p.currentSong.color[0]}, ${(p) => p.currentSong.color[1]});
	@media screen and (max-width: 768px) {
		margin-bottom: 10px; /* Space between the track and other elements */
	}
`;


const AnimateTrack = styled.div`
	background: rgb(204, 204, 204);
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	transform: translateX(${(p) => Math.round((p.songInfo.currentTime * 100) / p.songInfo.duration) + "%"});
	pointer-events: none;
`;

const Input = styled.input`
	width: 100%;
	-webkit-appearance: none;
	background: transparent;
	cursor: pointer;
	&:focus {
		outline: none;
		-webkit-appearance: none;
	}

	@media screen and (max-width: 768px) {
		/* Make slider thumb bigger on mobile */
		&::-webkit-slider-thumb {
			height: 24px;
			width: 24px;
		}
	}
	&::-webkit-slider-thumb {
		-webkit-appearance: none;
		height: 12px;
		width: 12px;
		background: transparent;
		border: none;
	}
	&::-moz-range-thumb {
		-webkit-appearance: none;
		background: transparent;
		border: none;
	}
	&::-ms-thumb {
		-webkit-appearance: none;
		background: transparent;
		border: none;
	}
`;

const P = styled.p`
	padding: 0 1rem 0 1rem;
	user-select: none;
	@media screen and (max-width: 768px) {
		font-size: 0.75rem; /* Reduce font size on mobile */
	}
`;

const PlayControlContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0.8rem;
	width: 30%;
	@media screen and (max-width: 768px) {
		width: 80%; /* Make controls take more space on mobile */
		justify-content: space-around;
	}
`;

export default Player;
