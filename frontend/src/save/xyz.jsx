import React, { useEffect, useState } from 'react';
import { loginEndPoint } from '../spotify';
import axios from 'axios';

const App = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [topTracks, setTopTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [recentTracks, setRecentTracks] = useState([]);

  // Extract access token from URL
  useEffect(() => {
    const hash = window.location.hash;
    const token = new URLSearchParams(hash.replace('#', '?')).get('access_token');
    if (token) {
      setAccessToken(token);
      window.history.pushState({}, null, window.location.pathname); // Remove token from URL
    }
  }, []);

  useEffect(() => {
    if (!accessToken) return;

    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://api.spotify.com/v1/me', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchTrackPopularity = async (trackIds) => {
      const trackPopularity = {};
      try {
        const response = await axios.get(`https://api.spotify.com/v1/tracks?ids=${trackIds.join(',')}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        response.data.tracks.forEach(track => {
          trackPopularity[track.id] = track.popularity;
        });
      } catch (error) {
        console.error('Error fetching track popularity:', error);
      }
      return trackPopularity;
    };

    const fetchArtistPopularity = async (artistIds) => {
      const artistPopularity = {};
      try {
        const response = await axios.get(`https://api.spotify.com/v1/artists?ids=${artistIds.join(',')}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        response.data.artists.forEach(artist => {
          artistPopularity[artist.id] = { popularity: artist.popularity, followers: artist.followers.total };
        });
      } catch (error) {
        console.error('Error fetching artist popularity:', error);
      }
      return artistPopularity;
    };

    const fetchData = async () => {
      try {
        const [topTracksRes, topArtistsRes, recentTracksRes] = await Promise.all([
          axios.get('https://api.spotify.com/v1/me/top/tracks', { headers: { Authorization: `Bearer ${accessToken}` } }),
          axios.get('https://api.spotify.com/v1/me/top/artists', { headers: { Authorization: `Bearer ${accessToken}` } }),
          axios.get('https://api.spotify.com/v1/me/player/recently-played?limit=10', { headers: { Authorization: `Bearer ${accessToken}` } })
        ]);

        const tracks = topTracksRes.data.items;
        const artists = topArtistsRes.data.items;
        setTopTracks(tracks);
        setTopArtists(artists);
        setRecentTracks(recentTracksRes.data.items);

        const trackIds = tracks.map(track => track.id);
        const artistIds = artists.map(artist => artist.id);

        const [trackPopularity, artistPopularity] = await Promise.all([
          fetchTrackPopularity(trackIds),
          fetchArtistPopularity(artistIds)
        ]);

        const obscurityData = tracks.map(track => {
          const artist = track.artists[0];
          const trackPop = trackPopularity[track.id] || 50;
          const artistPop = artistPopularity[artist.id]?.popularity || 50;

          return {
            name: track.name,
            artist: artist.name,
            obscurity: (100 - trackPop + (100 - artistPop)) / 2,
          };
        });

        console.log('Obscurity Scores:', obscurityData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUserData();
    fetchData();
  }, [accessToken]);

  return (
    <div className="bg-red-400 flex flex-col justify-center items-center h-full w-full">
      {!accessToken ? (
        <a href={loginEndPoint} className="text-white text-xl p-4 bg-blue-500 rounded">
          Login
        </a>
      ) : (
        <div className="text-center text-white">
          <h2 className="text-2xl mb-4">Welcome, {userData ? userData.display_name : 'Loading...'}</h2>
          {userData && (
            <div>
              <img src={userData.images[0]?.url} alt={userData.display_name} className="mb-4 rounded-full" style={{ width: 100, height: 100 }} />
              <p><strong>Name:</strong> {userData.display_name}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>Followers:</strong> {userData.followers.total}</p>
            </div>
          )}

          <h3 className="text-xl mt-6">Your Top Tracks</h3>
          {topTracks.length ? (
            <ul>{topTracks.map(track => <li key={track.id}>{track.name} by {track.artists.map(artist => artist.name).join(', ')}</li>)}</ul>
          ) : <p>Loading top tracks...</p>}

          <h3 className="text-xl mt-6">Your Top Artists</h3>
          {topArtists.length ? (
            <ul>{topArtists.map(artist => <li key={artist.id}>{artist.name}</li>)}</ul>
          ) : <p>Loading top artists...</p>}

          <h3 className="text-xl mt-6">Recently Played Tracks</h3>
          {recentTracks.length ? (
            <ul>{recentTracks.map(item => <li key={item.track.id}>{item.track.name} by {item.track.artists.map(artist => artist.name).join(', ')}</li>)}</ul>
          ) : <p>Loading recently played tracks...</p>}
        </div>
      )}
    </div>
  );
};

export default App;
