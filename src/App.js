import React, { useState, useRef } from "react";
import styled from "styled-components";
import "./App.css";
import videoBg from "./assets/videoBg8.mp4";

// Import components
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";
import AlbumList from "./components/AlbumList";
// Import data
import data from "./data";

const App = () => {
  // Ref
  const audioRef = useRef(null);

  // State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });

  // Functions
  const updateTimeHandler = (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime, duration });
  };

  const songEndHandler = () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    let nextSong = songs[(currentIndex + 1) % songs.length];
    setCurrentSong(nextSong);

    // Update the song's active state
    const newSongs = songs.map((song) => {
      if (song.id === nextSong.id) {
        return { ...song, active: true };
      } else {
        return { ...song, active: false };
      }
    });
    setSongs(newSongs);

    // Reload the audio element with the new source and play
    audioRef.current.load();  // Ensure the audio source is reloaded
    if (isPlaying) {
      audioRef.current.play();
    }
  };

  // TODO ADD LOTTIE VISUALIZATION 

  return (
    <AppContainer libraryStatus={libraryStatus}>
      <div className="appContainer">
<div className="main">
  <video 
    src={videoBg} 
    autoPlay 
    loop 
    muted 
    playsInline 
    // style={{ width: "100%", height: "auto" }}
  />
</div>

        <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
        <Library
          songs={songs}
          setCurrentSong={setCurrentSong}
          audioRef={audioRef}
          isPlaying={isPlaying}
          setSongs={setSongs}
          libraryStatus={libraryStatus}
          setLibraryStatus={setLibraryStatus} // Pass down the setLibraryStatus function
        />
        <div className="container">
          <div className="card"></div>
          <AlbumList />
          <audio
            onLoadedMetadata={updateTimeHandler}
            onTimeUpdate={updateTimeHandler}
            onEnded={songEndHandler}
            ref={audioRef}
            src={currentSong.audio}
          />
        </div>
        <div className="music">
          <Song currentSong={currentSong} />
          <Player
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            currentSong={currentSong}
            setCurrentSong={setCurrentSong}
            audioRef={audioRef}
            songInfo={songInfo}
            setSongInfo={setSongInfo}
            songs={songs}
            setSongs={setSongs}
          />
        </div>
      </div>
    </AppContainer>
  );
};

const AppContainer = styled.div`
  transition: all 0.5s ease;
  margin-left: ${(p) => (p.libraryStatus ? "20rem" : "0")};
  @media screen and (max-width: 768px) {
    margin-left: 0;
  }
`;

export default App;
