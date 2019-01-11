import React, {Component} from 'react';

class Artist extends Component {
  render () {
    return (
      <div className="Track">
        <div className="Track-information">
          <h4>{this.props.artist.artistName}</h4>
        </div>
        <span><em>Only tracks may be added</em></span>
      </div>
    );
  }
}

export default Artist;