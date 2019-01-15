import React, {Component} from 'react';

class Track extends Component {
  constructor(props) {
    super(props);
    this.state = {listening: false}
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.trackAudio = this.trackAudio.bind(this);
  }
  
  addTrack() {
    this.props.onAdd(this.props.track);
  }
  
  removeTrack() {
    this.props.onDelete(this.props.track);
  }
  
  trackAudio() {
    this.setState({
      listening: true
    })
  }
  
  render () {
    let addRemove;
    let trackPlayer;
    let iframeSrc = `https://open.spotify.com/embed/track/${this.props.track.spotifyId}`;
    
    if (this.props.onAdd) {
      addRemove = <a className="Track-action add" onClick={this.addTrack}>+</a>;
    } else {
      addRemove = <a className="Track-action remove" onClick={this.removeTrack}>-</a>;
    }
    
    if (this.state.listening) {
      trackPlayer = <iframe  src={iframeSrc} width="250" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>;
    }
    return (
      <div className="Track">
        <div className="Track-information">
          <h4>{this.props.track.trackName}</h4>
          <p>{this.props.track.artistName} | {this.props.track.albumName}</p>
        </div>
        {addRemove}
        <a className='Track-audio' onClick={this.trackAudio}>Listen</a>
        {trackPlayer}
      </div>
    );
  }
}

export default Track;
