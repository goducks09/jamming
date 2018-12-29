let userToken = '';
const clientId = 'c54e893fe44446a283b3e2f1f747e83c';
const redirectUri = 'http://localhost:3000/';
const searchUrl = 'https://api.spotify.com/v1/search?q=';

const Spotify = {
  getUserToken() {
    if(userToken !== '') {
      return userToken;
    } else if(window.location.href.includes('access_token=') && window.location.href.includes('expires_in=')) {
      const url = window.location.href;
      const tokenExpiration = url.match(/expires_in=([^&]*)/);
      userToken = url.match(/access_token=([^&]*)/);
      
      window.setTimeout(() => userToken = '', tokenExpiration * 1000);
      window.history.pushState('Access Token', null, '/');
    } else {
      window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
    }
    
    console.log(userToken);
  },
  
  search(input, type) {
    this.getUserToken();
    
    return fetch(`${searchUrl}${input}&type=${type}`, {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    }).then(
      response => {
        if(response.ok) {
          return response.json();
        } else {
          console.log(response)
        }
        }, networkError => console.log(networkError.error)
    ).then(
      jsonResponse => {
          const results = {
            albums: [],
            artists: [],
            tracks: []
          };
          
          results.albums = jsonResponse.albums.items.map(item => {
            return {
              albumName: item.name,
              artistName: item.artists.name,
              spotifyId: item.id
          }});
          
          results.artists = jsonResponse.artists.items.map(item => {
            return {
              artistName: item.name,
              spotifyId: item.id
            }
          });
          
          results.tracks = jsonResponse.tracks.items.map(item => {
            return {
              albumName: item.album.name,
              artistName: item.artists.name,
              spotifyId: item.id,
              trackName: item.name
            }
          });
          
          return results;
        }
    );
  }
};

export default Spotify;