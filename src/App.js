import React, { Component } from 'react';
import './App.css';
import SearchBar from './components/searchbar';
import ResultList from './resultList';
import Playlist from './playlist';
import Spotify from './util/api';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    };
    this.searchSpotify = this.searchSpotify.bind(this);
  }
  
  searchSpotify(input, type) {
    Spotify.search(input, type).then(results => {
      this.setState({
        results: results
      })
    });
  }
  
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar searchSpotify={this.searchSpotify} />
          <div class="App-playlist">
            <ResultList />
            <Playlist />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
