import React, { useState } from 'react';
import axios from 'axios';

const PlaylistCreator = ({ accessToken, tracks }) => {
  const [playlistName, setPlaylistName] = useState('');
  const [creating, setCreating] = useState(false);

  const createPlaylist = async () => {
    if (!playlistName) return;

    setCreating(true);
    try {
        const userResponse = await axios.get('https://api.spotify.com/v1/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
        });

        const userId = userResponse.data.id;

        const playlistResponse = await axios.post(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
            name: playlistName,
            description: 'Created from My Spotify Analysis App',
            public: false
        },
        { headers: { Authorization: `Bearer ${accessToken}` } }
        );


      const trackUris = tracks.map(t => t.uri);
      await axios.post(
        `https://api.spotify.com/v1/playlists/${playlistResponse.data.id}/tracks`,
        { uris: trackUris },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      alert('Playlist created!');
      setPlaylistName('');
    } catch (err) {
      console.error(err);
      alert('Error creating playlist');
    }
    setCreating(false);
  };

  return (
    <div className="bg-purple-200 p-6 rounded-2xl shadow-lg shadow-purple-300 w-full max-w-md mx-auto flex flex-col gap-4">
        <input
            className="w-full p-3 rounded-xl border border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={playlistName}
            onChange={e => setPlaylistName(e.target.value)}
            placeholder="Playlist Name"
        />
        <button
            className="w-full bg-purple-500 hover:bg-purple-600 text-white p-3 rounded-xl font-semibold"
            onClick={createPlaylist}
            disabled={creating || !tracks.length}
        >
            {creating ? 'Creating...' : 'Create Playlist from Top Tracks'}
        </button>
        </div>

  );
};

export default PlaylistCreator;
