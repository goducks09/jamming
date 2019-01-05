import React, { Component } from 'react';
import './App.css';
import SearchBar from './components/searchbar';
import ResultList from './components/resultList';
import Playlist from './components/playlist';
import Spotify from './util/api';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: {
        albums: [],
        artists: [],
        tracks: []
      },
      playlist: []
    };
    
    this.searchSpotify = this.searchSpotify.bind(this);
    this.addToPlaylist = this.addToPlaylist.bind(this);
  }
  
  searchSpotify(input, type) {
    Spotify.search(input, type).then(results => {
      this.setState({
        results
      })
    });
  }
  
  addToPlaylist(track) {
    if (this.state.playlist.find(savedTrack => savedTrack.spotifyId === track.spotifyId)) {
      return;
    }
    this.setState({
      playlist: [...this.state.playlist, track]
    });
  }
  
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar searchSpotify={this.searchSpotify} />
          <div className="App-playlist">
            <div className="SearchResults">
              <h2>Results</h2>
              <ResultList results={this.state.results} onAdd={this.addToPlaylist} />
            </div>
            <div className="Playlist">
              <input defaultValue={'New Playlist'} />
              <Playlist playlistTracks={this.state.playlist} />
              <a className="Playlist-save">SAVE TO SPOTIFY</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;