import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { loginEndPoint } from '../spotify';
import TopSongs from './components/TopSongs';
import TopArtists from './components/TopArtists';
import PlaylistCreator from './components/PlaylistCreator';
import TopGenres from './components/TopGenres';
import Home from './components/Home';
import Dashboard from './components/Dashboard';

const App = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [topTracks, setTopTracks] = useState(null);
  const [topArtists, setTopArtists] = useState(null);
  const [obscurityData, setObscurityData] = useState(null);

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const token = params.get('access_token');
    if (token) {
      setAccessToken(token);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  useEffect(() => {
    if (!accessToken) return;

    const fetchData = async () => {
      try {
        const userResponse = await axios.get('https://api.spotify.com/v1/me', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setUserData(userResponse.data);

        const topTracksResponse = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const tracks = topTracksResponse.data.items || [];
        setTopTracks(tracks);

        const topArtistsResponse = await axios.get('https://api.spotify.com/v1/me/top/artists', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setTopArtists(topArtistsResponse.data.items?.slice(0, 5) || []);

        if (tracks.length === 0) {
          setObscurityData([]);
          return;
        }

        const trackIds = tracks.map(track => track.id);
        const response = await axios.get(
          `https://api.spotify.com/v1/tracks?ids=${trackIds.join(',')}`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        const trackPopularity = {};
        response.data.tracks.forEach(track => {
          trackPopularity[track.id] = track.popularity;
        });

        const obscurityResults = tracks.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0]?.name || "Unknown Artist",
          obscurity: Math.round(100 - (trackPopularity[track.id] || 50)),
          uri: track.uri
        }));

        setObscurityData(obscurityResults);
      } catch (error) {
        console.error('Error fetching Spotify data:', error);
      }
    };

    fetchData();
  }, [accessToken]);

  return (
    <div className="w-full min-h-screen">
      {!accessToken ? (
        <Home loginEndPoint={loginEndPoint} />
      ) : (
        <>
          <Dashboard obscurityData={obscurityData || []} />

          <section className="w-full min-h-screen flex flex-col items-center justify-center bg-amber-100">
            <div className="flex flex-col gap-12 w-full max-w-5xl px-4">
              <TopSongs obscurityData={obscurityData || []} />
            </div>
          </section>

          <section className="w-full min-h-screen flex flex-col items-center justify-center bg-emerald-100">
            <div className="flex flex-col gap-12 w-full max-w-5xl px-4">
              <TopArtists topArtists={topArtists || []} />
            </div>
          </section>

          <section className="w-full min-h-screen flex flex-col items-center justify-center bg-purple-100">
            <div className="flex flex-col gap-6 w-full max-w-3xl px-4">
              <h2 className="text-2xl font-bold mb-4">Create a Playlist</h2>
              <PlaylistCreator accessToken={accessToken} tracks={topTracks || []} />
            </div>
          </section>

          <section className="w-full min-h-screen flex flex-col items-center justify-center bg-yellow-100">
            <div className="flex flex-col gap-6 w-full max-w-3xl px-4">
              <h2 className="text-2xl font-bold mb-4">Your Top Genres</h2>
              <TopGenres topArtists={topArtists || []} />
            </div>
          </section>

          <section className="w-full py-12 flex flex-col items-center bg-gray-800">
            <footer className="text-white py-4 text-center w-full">
              <div className="flex items-center justify-center mb-2">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg"
                  alt="Spotify Logo"
                  className="w-6 h-6 mr-2"
                />
                <a
                  href="https://www.spotify.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Powered by Spotify
                </a>
              </div>
              <div className="flex justify-center space-x-4">
                <a
                  href="mailto:shivanshdutta59@gmail.com"
                  className="hover:underline"
                >
                  Contact Me
                </a>
                <span className="text-gray-400">|</span>
                <span className="hover:underline cursor-default">About</span>
                <span className="text-gray-400">|</span>
                <span className="hover:underline cursor-default">Terms</span>
                <span className="text-gray-400">|</span>
                <span className="hover:underline cursor-default">Privacy</span>
              </div>
              <p className="text-sm mt-2">
                &copy; {new Date().getFullYear()} Shivansh Dutta. All rights reserved.
              </p>
            </footer>
          </section>
        </>
      )}
    </div>
  );
};

export default App;
