import React, {Component} from 'react';

class Album extends Component {
  render () {
    return (
      <div className="Track">
        <div className="Track-information">
          <h4>{this.props.album.albumName}</h4>
          <p>{this.props.album.artistName}</p>
        </div>
        <span><em>Only tracks may be added</em></span>
      </div>
    );
  }
}

export default Album;