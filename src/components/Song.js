import React from "react";
import styled from "styled-components";

const Song = ({ currentSong }) => {
	return (
		<SongContainer>
			<Img src={currentSong.cover} alt={currentSong.name}></Img>
			<TitleContainer>
				<H1>{currentSong.name}</H1>
				<H2>{currentSong.artist}</H2>
			</TitleContainer>
		</SongContainer>
	);
};

const TitleContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	flex: 0 0 50%;
`;

const SongContainer = styled.div`
	display: flex;
	flex-direction: row;
	flex: 0 0 15%;
	align-items: center;
	justify-content: center;
`;

const Img = styled.img`
	width: 5vh;
	margin: 2vh;
	@media screen and (max-width: 768px) {
		width: 50%;
	}
`;

const H1 = styled.h2`
font-size: 2vh;
`;

const H2 = styled.h3`
	font-size: 1vh;
`;

export default Song;
