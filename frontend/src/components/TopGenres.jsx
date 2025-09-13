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
    <div className="bg-purple-200 p-6 rounded-2xl shadow-lg shadow-purple-300 w-full">
      <h3 className="text-3xl font-bold mb-6 text-gray-800 text-center">Top Genres</h3>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
        {sortedGenres.map(([genre, count]) => (
          <li
            key={genre}
            className="p-4 rounded-xl bg-purple-100 flex justify-between items-center shadow-sm"
          >
            <span className="capitalize">{genre}</span>
            <span className="font-semibold">{count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopGenres;
