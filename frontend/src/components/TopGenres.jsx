import React from 'react';

const TopGenres = ({ topArtists }) => {
  const genreCount = {};

  topArtists.forEach(artist => {
    artist.genres.forEach(genre => {
      genreCount[genre] = (genreCount[genre] || 0) + 1;
    });
  });

  const sortedGenres = Object.entries(genreCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-2">Your Top Genres</h2>
      <ul>
        {sortedGenres.map(([genre, count]) => (
          <li key={genre} className="capitalize">{genre} ({count})</li>
        ))}
      </ul>
    </div>
  );
};

export default TopGenres;
