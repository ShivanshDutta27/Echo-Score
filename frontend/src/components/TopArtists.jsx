import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import bg from "../assets/bg.jpg";

const TopArtists = ({ topArtists }) => {
  return (
    <div className="bg-yellow-100 p-6 rounded-lg shadow-lg shadow-gray-400">
      <h3 className="text-3xl font-bold mb-6 text-gray-800 text-center">Top 5 Artists</h3>
      {topArtists ? (
        <div className="grid grid-cols-1 gap-4">
          {topArtists.map((artist, index) => {
            const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

            return (
              <motion.div
                ref={ref}
                key={artist.id}
                className="relative p-4 rounded-lg shadow-md overflow-hidden flex items-center gap-3"
                style={{
                  backgroundImage: `url(${bg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: "easeOut" }}
                whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)" }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-10 rounded-lg"></div>

                {/* Small Ranking Badge */}
                <div className="relative z-10 w-6 h-6 flex items-center justify-center bg-gray-900 text-white text-xs font-bold rounded-full shadow-md">
                  {index + 1}
                </div>

                {/* Artist Info */}
                <div className="relative z-10 text-black flex-1">
                  <p className="text-base font-semibold">{artist.name}</p>
                  <p className="text-xs">Followers: {artist.followers.total.toLocaleString()}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-700 text-center">Loading...</p>
      )}
    </div>
  );
};

export default TopArtists;
