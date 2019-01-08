import React, {Component} from 'react';

class Track extends Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }
  
  addTrack() {
    this.props.onAdd(this.props.track);
  }
  
  removeTrack() {
    this.props.onDelete(this.props.track);
  }
  
  render () {
    let addRemove;
    if (this.props.onAdd) {
      addRemove = <a className="Track-action" onClick={this.addTrack}>+</a>;
    } else {
      addRemove = <a className="Track-action" onClick={this.removeTrack}>-</a>;
    }
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.trackName}</h3>
          <p>{this.props.track.artistName} | {this.props.track.albumName}</p>
        </div>
        {addRemove}
      </div>
    );
  }
}

export default Track;

/* Need to add prop to <a> for removeTrack and also change the + to a - */