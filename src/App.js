import React, { Component } from 'react';
import './App.css';
import SearchBar from './components/Searchbar/searchbar';
import ResultList from './components/ResultList/resultList';
import Playlist from './components/Playlist/playlist';
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
      playlist: [],
      playlistName: 'New Playlist'
    };
    
    this.addToPlaylist = this.addToPlaylist.bind(this);
    this.removeFromPlaylist = this.removeFromPlaylist.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.searchSpotify = this.searchSpotify.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
  }
  
  addToPlaylist(track) {
    if (this.state.playlist.find(savedTrack => savedTrack.spotifyId === track.spotifyId)) {
      return;
    }
    this.setState(prevState => ({
      playlist: [...prevState.playlist, track]
    }));
  }
  
  removeFromPlaylist(track) {
    if (this.state.playlist.find(savedTrack => savedTrack.spotifyId === track.spotifyId)) {
      let trackIndex = this.state.playlist.indexOf(track);
      this.setState(prevState => ({
        playlist: [...prevState.playlist.slice(0, trackIndex), ...prevState.playlist.slice(trackIndex + 1)]
      }));
    }
    return;
  }
  
  savePlaylist () {
    const trackURIs = this.state.playlist.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState({
      playlist: [],
      playlistName: 'New Playlist'
    });
    
  }
  
  searchSpotify(input, type) {
    Spotify.search(input, type).then(results => {
      this.setState({
        results
      })
    });
  }
  
  updatePlaylistName (name) {
    this.setState({
      playlistName: name
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
              <Playlist playlistTracks={this.state.playlist} playlistName={this.state.playlistName} onDelete={this.removeFromPlaylist} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
    
  }
}

export default App;