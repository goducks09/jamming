import React, {Component} from 'react';
import Album from './albums';
import Artist from './artists';
import Track from './tracks';

class ResultList extends Component {
  render () {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <div className="TrackList">
          <div className='albums'>
            <h3>Albums</h3>
            {this.state.results.albums.map(album => return <Album key={album.spotifyId} album={album} />)}
          </div>
          <div className='artists'>
            <h3>Artists</h3>
            {this.state.results.artists.map(artist => return <Atrtist key={artist.spotifyId} artist={artist} />)}
          </div>
          <div className='tracks'>
            <h3>Tracks</h3>
            {this.state.results.tracks.map(track => return <Track key={track.spotifyId} track={track} />)}
          </div>
        </div>
      </div>
    );
  }
}

export default ResultList;