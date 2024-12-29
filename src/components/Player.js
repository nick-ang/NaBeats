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
      audioRef.current.muted = false; // Ensure it's unmuted
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
    let nextSong;

    if (direction === "skip-forward") {
      nextSong = songs[(currentIndex + 1) % songs.length];
    } else if (direction === "skip-back") {
      nextSong = songs[(currentIndex - 1 + songs.length) % songs.length]; // Fix negative index logic
    }

    // Update the current song first
    setCurrentSong(nextSong);
    activeLibraryHandler(nextSong);

    // Ensure the audio plays after the state is updated
    setTimeout(() => {
      if (isPlaying && audioRef.current) {
        console.log("Attempting to play:", audioRef.current.paused); // Debug log
        if (audioRef.current.paused) {
          // If the audio is paused, attempt to play it
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            playPromise.catch((error) => {
              console.error("Play failed:", error); // Catch any errors
            });
          }
        }
      }
    }, 100); // Delay to allow state update to complete before trying to play
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
          size="0.9x" // Even smaller icon size for compactness
          style={pointer}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          icon={togglePlayPauseIcon()}
          size="1.1x" // Slightly smaller icon size for compactness
          style={pointer}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-forward")}
          className="skip-forward"
          icon={faAngleRight}
          size="0.9x" // Even smaller icon size for compactness
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
  min-height: 4vh; /* Reduced height */
  justify-content: space-evenly;
  display: flex;
  flex-direction: row;
  flex: 0 0 75%;
  width: 100%;
  @media screen and (max-width: 768px) {
    flex-direction: column; /* Stack elements vertically on mobile */
    align-items: center;
    padding: 4px; /* Reduced padding */
  }
`;

const TimeControlContainer = styled.div`
  width: 35%; /* Further reduced width for time control */
  display: flex;
  align-items: center;
  @media screen and (max-width: 768px) {
    width: 75%; /* Make track container take up more space on mobile */
    margin-top: 6px; /* Less space between controls and slider */
    padding-bottom: 8px; /* Reduced bottom padding */
  }
`;

const Track = styled.div`
  background: lightblue;
  width: 100%;
  height: 0.6rem; /* Smaller track height */
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  background: linear-gradient(to right, ${(p) => p.currentSong.color[0]}, ${(p) => p.currentSong.color[1]});
  @media screen and (max-width: 768px) {
    margin-bottom: 6px; /* Less space between the track and other elements */
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
  /* Ensure the slider is full-width and functional */
  @media screen and (max-width: 768px) {
    /* Make slider thumb bigger on mobile */
    &::-webkit-slider-thumb {
      height: 18px;
      width: 18px;
    }
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 14px; /* Slightly larger thumb size for better interaction */
    width: 14px;
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
  padding: 0 0.3rem 0 0.3rem; /* Smaller padding */
  user-select: none;
  font-size: 0.6rem; /* Smaller font size */
  @media screen and (max-width: 768px) {
    font-size: 0.5rem; /* Further reduced font size on mobile */
  }
`;

const PlayControlContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem; /* Reduced padding */
  width: 30%;
  @media screen and (max-width: 768px) {
    width: 70%; /* Slightly more compact control area on mobile */
    justify-content: space-around;
  }
`;

export default Player;
