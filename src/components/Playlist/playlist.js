/* This component renders tracks added from the search query to a new playlist */

import React, {Component} from 'react';
import ResultList from '../ResultList/resultList';

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }
  
  handleNameChange (e) {
    this.props.onNameChange(e.target.value);
  }
  
  render () {
    return (
    <div className="Playlist">
      <input value={this.props.playlistName} onChange={this.handleNameChange} />
      <ResultList tracks={this.props.playlistTracks} onDelete={this.props.onDelete} />
      <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
    </div>
    );
  }
}

export default Playlist;