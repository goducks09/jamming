import React, {Component} from 'react';
import Tracklist from './tracklist';

class Playlist extends Component {
  render () {
    return (
      <div className="Playlist">
        <input value='New Playlist' />
        <Tracklist />
        <a className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;