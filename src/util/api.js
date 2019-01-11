/* This object connects to the Spotify API and requests user authorization. Results are split into album, artist, and track categories. Upon authorization, a user can search Spotify and create a playlist to save to their profile. */

/* Future feature: for user adding entire album, get href or id key from and add secondary fetch to return album tracks. */

let userToken = '';
const clientId = 'c54e893fe44446a283b3e2f1f747e83c';
const redirectUri = 'https://nowplaying.surge.sh';
const searchUrl = 'https://api.spotify.com/v1/search?q=';
const userUrl = 'https://api.spotify.com/v1/me';

const Spotify = {
  getUserToken() {
    if(userToken !== '') {
      return userToken;
    } else if (window.location.href.includes('access_token=') && window.location.href.includes('expires_in=')) {
      const url = window.location.href;
      const tokenExpiration = url.match(/expires_in=([^&]*)/)[1];
      userToken = url.match(/access_token=([^&]*)/)[1];
      
      window.setTimeout(() => userToken = '', tokenExpiration * 1000);
      window.history.pushState('Access Token', null, '/');
      
      return userToken;

    } else {
      window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
    }
  },
  
  savePlaylist (playlistName, URIs) {
    let userId;
    if (!playlistName && !URIs) {
      return;
    } else {
      this.getUserToken();

      return fetch(`${userUrl}`, {
        headers: {
        Authorization: `Bearer ${userToken}`
        }
      }).then(response => {
        if(response.ok) {
          return response.json();
        } else {
          console.log(response);
        }}, networkError => console.log(networkError.error)
        ).then(
          jsonResponse => {
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${userToken}`,
                "Content-Type": 'application/json'
              },
              body: JSON.stringify({name: playlistName})
            }).then(response => {
              if (response.ok || response.created) {
                return response.json();
              } else {
                console.log(response);
              }}, networkError => console.log(networkError.error)
              ).then(jsonResponse => {
                const playlistId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                  method: 'POST',
                  headers: {
                    Authorization: `Bearer ${userToken}`,
                    "Content-Type": 'application/json'
                  },
                  body: JSON.stringify({uris: URIs})
                }).then(response => {
                  if (response.ok) {
                    return response.json();
                  } else {
                    console.log(response);
                  }}, networkError => console.log(networkError.error)
                  ).then(jsonResponse => {
                    const playlistId = jsonResponse.snapshot_id;
                    return playlistId;
                    })
            })
          })
    }
  },
  
  search(input, type) {
    this.getUserToken();
    
    return fetch(`${searchUrl}${input}&type=${type}&limit=10`, {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    }).then(
      response => {
        if(response.ok) {
          return response.json();
        } else {
          console.log(response);
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
              artistName: item.artists.map(artist => artist.name).join(', '),
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
              artistName: item.artists.map(artist => artist.name).join(', '),
              spotifyId: item.id,
              trackName: item.name,
              uri: item.uri
            }
          });
        
          return results;
        }
    );
  }
};

export default Spotify;