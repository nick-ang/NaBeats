import React from "react";
import AlbumCoverGrid from './AlbumCoverGrid';
import albums from './albums.json';

const AlbumList = () => {
    return (
      <section id="albums">
        <div >
          <AlbumCoverGrid albums={albums} />
        </div>
        </section>
      );
};

export default AlbumList;
