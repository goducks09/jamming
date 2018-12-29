import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      type: 'album,artist,track'
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  
  handleInputChange(e) {
    this.setState({
      input: e.target.value
    });
  }
  
  handleSearch(e) {
    this.props.searchSpotify(this.state.input, this.state.type);
    e.preventDefault();
  }
  
  render() {
    return (
      <div className="SearchBar">
        <input onChange={this.handleInputChange} placeholder="Enter an album, artist, or song" />
        <a onClick={this.handleSearch}>SEARCH</a>
      </div>
    )
  }
}

export default SearchBar;