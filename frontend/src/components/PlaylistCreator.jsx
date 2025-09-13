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

      const playlistResponse = await axios.post(
        `https://api.spotify.com/v1/users/${userResponse.data.id}/playlists`,
        { name: playlistName, description: 'Created from My Spotify Analysis App', public: false },
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
    <div className="flex flex-col gap-2">
      <input
        className="border p-2 rounded"
        value={playlistName}
        onChange={e => setPlaylistName(e.target.value)}
        placeholder="Playlist Name"
      />
      <button
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        onClick={createPlaylist}
        disabled={creating || !tracks.length}
      >
        {creating ? 'Creating...' : 'Create Playlist from Top Tracks'}
      </button>
    </div>
  );
};

export default PlaylistCreator;
