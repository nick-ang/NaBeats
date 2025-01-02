import React, { useState } from 'react';
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMusic, faGift } from '@fortawesome/free-solid-svg-icons'; // Solid icons
import { faSoundcloud, faSpotify, faApple } from '@fortawesome/free-brands-svg-icons'; // Brand icons

const Nav = ({ libraryStatus, setLibraryStatus }) => {
  const [isSticky, setSticky] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > 50) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`sticky-header ${isSticky ? 'sticky' : ''}`}>
      <NavContainer>
        {/* Left-side icons */}
        <NavLeft>
          <a href="mailto:nicholas_ang@outlook.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faEnvelope} size="lg" />
          </a>

          <a 
            href="https://soundcloud.com/tokyofactory" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ marginLeft: '15px' }}
          >
            <FontAwesomeIcon icon={faSoundcloud} size="lg" />
          </a>

          <a 
            href="https://itunes.apple.com/your-itunes-page" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ marginLeft: '15px' }}
          >
            <FontAwesomeIcon icon={faApple} size="lg" />
          </a>

          <a 
            href="https://open.spotify.com/artist/5cdZiOOuN4jkZWgm8EBarq" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ marginLeft: '15px' }}
          >
            <FontAwesomeIcon icon={faSpotify} size="lg" />
          </a>

          <a 
            href="https://buymeacoffee.com/nabeats" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ marginLeft: '15px' }}
          >
            <FontAwesomeIcon icon={faGift} size="lg" /> {/* Gift icon */}
          </a>
        </NavLeft>

        {/* Centered NaBeats Title */}
        <H1 libraryStatus={libraryStatus}>
          <a href="./">NaBeats</a>
        </H1>

        {/* Right-side Library Button */}
        <NavRight>
          <Button onClick={() => setLibraryStatus(!libraryStatus)}>
            <FontAwesomeIcon icon={faMusic} style={{ marginRight: '8px' }} /> {/* Space between icon and text */}
            {libraryStatus ? 'Library' : 'Library'}
          </Button>
        </NavRight>
      </NavContainer>
    </header>
  );
};

// Styled Components

const NavContainer = styled.div`
  min-height: 10vh;
  display: flex;
  padding: 5vh;
  justify-content: space-between;
  align-items: center;
  position: relative;
  transition: all 0.3s ease;
  @media screen and (max-width: 768px) {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    flex-direction: column;
    padding: 2vh;
    justify-content: flex-start;
  }
`;

const NavLeft = styled.div`
  display: flex;
  align-items: center;
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 10px;
    position: relative; /* Change from absolute to relative */
    top: auto;  /* Remove the top positioning */
    right: auto; /* Remove right positioning */
  }
`;

const H1 = styled.h1`
  transition: all 0.5s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0;
  
  @media screen and (max-width: 768px) {
    visibility: ${(p) => (p.libraryStatus ? "hidden" : "visible")};
    opacity: ${(p) => (p.libraryStatus ? "0" : "100")};
    transition: all 0.5s ease;
    margin-bottom: 20px;
  }
`;

const Button = styled.button`
  background: white;
  border: none;
  cursor: pointer;
  border: 2px solid rgb(65, 65, 65);
  padding: 0.5rem 1.5rem;
  margin-left: 80px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: rgb(65, 65, 65);
    color: white;
  }

  @media screen and (max-width: 768px) {
    margin-left: 0;
    margin-top: 10px;
    padding: 0.25rem 1rem;
    font-size: 0.8rem;
  }
`;

export default Nav;
