import React from 'react';

const AlbumCoverGrid = ({ albums }) => {
  return (
    <div className="album-cover-grid">
      {albums.map((album) => (
        <div key={album.id} className="album-cover-grid-item">
          <img src={album.cover_url} alt={album.name} />
          <p>{album.name}</p>
        </div>
      ))}
    </div>
  );
};

export default AlbumCoverGrid;
