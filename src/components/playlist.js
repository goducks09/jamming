import React, {Component} from 'react';
import ResultList from './resultList';

class Playlist extends Component {
  render () {
    return (
      <ResultList tracks={this.props.playlistTracks} onDelete={this.props.onDelete} />
    );
  }
}

export default Playlist;