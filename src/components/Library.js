import React from "react";
import LibrarySong from "./LibrarySong";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons"; // Import the X icon

const Library = ({ songs, currentSong, setCurrentSong, audioRef, isPlaying, setSongs, libraryStatus, setLibraryStatus }) => {
  return (
    <LibraryContainer libraryStatus={libraryStatus}>
      {/* Close Button (X) */}
      <CloseButton onClick={() => setLibraryStatus(false)}>
        <FontAwesomeIcon icon={faTimes} size="lg" />
      </CloseButton>

      <H1>Library</H1>
      <SongContainer>
        {songs.map((song) => (
          <LibrarySong
            song={song}
            songs={songs}
            setCurrentSong={setCurrentSong}
            key={song.id}
            audioRef={audioRef}
            isPlaying={isPlaying}
            setSongs={setSongs}
          />
        ))}
      </SongContainer>
    </LibraryContainer>
  );
};

const LibraryContainer = styled.div`
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 20rem;
  height: 100%;
  background-color: white;
  box-shadow: 2px 2px 50px rgb(204, 204, 204);
  user-select: none;
  overflow: scroll;
  transform: translateX(${(p) => (p.libraryStatus ? "0%" : "-100%")});
  transition: all 0.5s ease;
  opacity: ${(p) => (p.libraryStatus ? "100" : "0")};
  scrollbar-width: thin;
  scrollbar-color: rgba(155, 155, 155, 0.5) transparent;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(155, 155, 155, 0.5);
    border-radius: 20px;
    border: transparent;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    z-index: 5;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: #333;
  transition: color 0.3s ease;

  &:hover {
    color: #ff0000; /* Optional: Change color on hover */
  }
`;

const SongContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffffa8;
`;

const H1 = styled.h2`
  padding: 2rem;
`;

export default Library;
