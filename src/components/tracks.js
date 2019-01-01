import React, {Component} from 'react';

class Track extends Component {
  render () {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.trackName}</h3>
          <p>{this.props.track.artistName} | {this.props.track.albumName}</p>
        </div>
        <a className="Track-action">+</a>
      </div>
    );
  }
}

export default Track;