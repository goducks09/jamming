import React, {Component} from 'react';

class Album extends Component {
  render () {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.album.albumName}</h3>
          <p>{this.props.album.artistName}</p>
        </div>
        <span><em>Only tracks can be added to a Playlist</em></span>
      </div>
    );
  }
}

export default Album;