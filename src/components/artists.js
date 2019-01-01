import React, {Component} from 'react';

class Artist extends Component {
  render () {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.artist.artistName}</h3>
        </div>
        <span><em>Only tracks can be added to a Playlist</em></span>
      </div>
    );
  }
}

export default Artist;