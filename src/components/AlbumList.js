import React from "react";
import AlbumCoverGrid from './AlbumCoverGrid';
import albums from './albums.json';

const AlbumList = () => {
    return (
      <section id="albums">
        <div style={{display:'flex', alignItems: 'center', justifyContent: 'center'}}>
          <AlbumCoverGrid albums={albums} />
        </div>
        </section>
      );
};

export default AlbumList;
