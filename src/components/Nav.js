import React, { useState } from 'react';
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

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
			<nav>
				<a href="./#albums">Albums</a>
				<a href="#">Contact</a>
			</nav>
			<H1 libraryStatus={libraryStatus}>NaBeats</H1>
			<Button onClick={() => setLibraryStatus(!libraryStatus)}>
				Library
				<FontAwesomeIcon icon={faMusic} />
			</Button>
		</NavContainer>
		</header>
	);
};

const NavContainer = styled.div`
	min-height: 10vh;
	display: flex;
	padding: 5vh;
	justify-content: space-between;
	align-items: center;
	@media screen and (max-width: 768px) {
		position: fixed;
		z-index: 10;
		top: 0;
		left: 0;
		width: 100%;
	}
`;

const H1 = styled.h1`
	transition: all 0.5s ease;

	@media screen and (max-width: 768px) {
		visibility: ${(p) => (p.libraryStatus ? "hidden" : "visible")};
		opacity: ${(p) => (p.libraryStatus ? "0" : "100")};
		transition: all 0.5s ease;
	}
`;

const Button = styled.button`
	background: white;
	border: none;
	cursor: pointer;
	border: 2px solid rgb(65, 65, 65);
	padding: 0.5rem;
	margin-left: 80px;
	transition: all 0.3s ease;
	&:hover {
		background: rgb(65, 65, 65);
		color: white;
	}
`;

export default Nav;
