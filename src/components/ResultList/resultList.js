/* This component returns a list of the search query broken into album, artist, and track categories*/

import React, {Component} from 'react';
import Album from '../SearchItems/albums';
import Artist from '../SearchItems/artists';
import Track from '../SearchItems/tracks';

class ResultList extends Component {
  render () {
    if (this.props.tracks) {
      return (
        <div className='tracks'>
          {this.props.tracks.map(track => <Track key={track.spotifyId} track={track} onDelete={this.props.onDelete} />)}
        </div>
      );
    } else {
        return (
          <div className="TrackList">
            <div className='albums'>
              <h3>Albums</h3>
              {this.props.results.albums.map(album => <Album key={album.spotifyId} album={album} />)}  
            </div>
            <div className='artists'>
              <h3>Artists</h3>
              {this.props.results.artists.map(artist => <Artist key={artist.spotifyId} artist={artist} />)}
            </div>
            <div className='tracks'>
              <h3>Tracks</h3>
              {this.props.results.tracks.map(track => <Track key={track.spotifyId} track={track} onAdd={this.props.onAdd} />)}
            </div>
          </div>
        );
      }
  }
}

export default ResultList;