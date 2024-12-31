import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

// Style
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
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const togglePlayPauseIcon = () => (isPlaying ? faPause : faPlay);

  const getTime = (time) => {
    if (isNaN(time) || time === Infinity) {
      return "00:00";
    }
    const minute = Math.floor(time / 60);
    const second = ("0" + Math.floor(time % 60)).slice(-2);
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
      nextSong = songs[(currentIndex - 1 + songs.length) % songs.length];
    }

    await setCurrentSong(nextSong);

    activeLibraryHandler(nextSong);

    if (audioRef.current) {
      audioRef.current.src = nextSong.audio;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const activeLibraryHandler = (newSong) => {
    const newSongs = songs.map((song) => ({
      ...song,
      active: song.id === newSong.id,
    }));
    setSongs(newSongs);
  };

  const songEndHandler = () => {
    skipTrackHandler("skip-forward");
  };

  const timeUpdateHandler = (e) => {
    setSongInfo({
      ...songInfo,
      currentTime: e.target.currentTime,
      duration: e.target.duration,
    });
  };

  // Automatically play the song when the component mounts
  useEffect(() => {
    const playOnLoad = async () => {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.log("Auto-play failed:", error);
      }
    };
    playOnLoad();
  }, [audioRef, setIsPlaying]);

  return (
    <PlayerContainer>
      <PlayControlContainer>
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-back")}
          className="skip-back"
          icon={faAngleLeft}
          size="0.9x"
          style={pointer}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          icon={togglePlayPauseIcon()}
          size="1.1x"
          style={pointer}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-forward")}
          className="skip-forward"
          icon={faAngleRight}
          size="0.9x"
          style={pointer}
        />
      </PlayControlContainer>

      <TimeControlContainer>
        <P>{getTime(songInfo.currentTime || 0)}</P>
        <Track currentSong={currentSong}>
          <Input
            onChange={dragHandler}
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime || 0}
            type="range"
          />
          <AnimateTrack songInfo={songInfo}></AnimateTrack>
        </Track>
        <P>{getTime(songInfo.duration || 0)}</P>
      </TimeControlContainer>

      <audio
        ref={audioRef}
        src={currentSong.audio}
        onTimeUpdate={timeUpdateHandler}
        onEnded={songEndHandler}
        onLoadedMetadata={timeUpdateHandler}
      />
    </PlayerContainer>
  );
};

const PlayerContainer = styled.div`
  min-height: 4vh;
  justify-content: space-evenly;
  display: flex;
  flex-direction: row;
  flex: 0 0 75%;
  width: 100%;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: 4px;
  }
`;

const TimeControlContainer = styled.div`
  width: 35%;
  display: flex;
  align-items: center;
  @media screen and (max-width: 768px) {
    width: 75%;
    margin-top: 6px;
    padding-bottom: 8px;
  }
`;

const Track = styled.div`
  background: lightblue;
  width: 100%;
  height: 0.6rem;
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  background: linear-gradient(to right, ${(p) => p.currentSong.color[0]}, ${(p) => p.currentSong.color[1]});
  @media screen and (max-width: 768px) {
    margin-bottom: 6px;
  }
`;

const AnimateTrack = styled.div`
  background: rgb(255, 0, 0);
  width: ${(p) =>
    Math.round((p.songInfo.currentTime * 100) / p.songInfo.duration) + "%"};
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
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
    &::-webkit-slider-thumb {
      height: 18px;
      width: 18px;
    }
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 14px;
    width: 14px;
    background: transparent;
    border: none;
  }
`;

const P = styled.p`
  padding: 0 0.3rem 0 0.3rem;
  user-select: none;
  font-size: 0.6rem;
  @media screen and (max-width: 768px) {
    font-size: 0.5rem;
  }
`;

const PlayControlContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem;
  width: 30%;
  @media screen and (max-width: 768px) {
    width: 70%;
    justify-content: space-around;
  }
`;

export default Player;
