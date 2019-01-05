import React, {Component} from 'react';

class Track extends Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
  }
  
  addTrack() {
    this.props.onAdd(this.props.track);
  }
  
  render () {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.trackName}</h3>
          <p>{this.props.track.artistName} | {this.props.track.albumName}</p>
        </div>
        <a className="Track-action" onClick={this.addTrack}>+</a>
      </div>
    );
  }
}

export default Track;