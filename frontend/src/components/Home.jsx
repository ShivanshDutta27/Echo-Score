import Aurora from './Aurora'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const Home = ({ loginEndPoint }) => {
  const [showNote, setShowNote] = useState(false)

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  }

  const headingVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  }

  const subheadingVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="relative w-full h-screen flex flex-col overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Aurora colorStops={["#00FF00", "#000000", "#00FF00"]} speed={0.5} />
      </div>

      <motion.div
        className="relative p-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-8xl font-bold text-white drop-shadow-lg"
          variants={headingVariants}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          Echo Score
        </motion.h1>
        <motion.p
          className="mt-4 text-lg md:text-xl text-gray-200 tracking-wide leading-relaxed font-serif"
          variants={subheadingVariants}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
        >
          Uncover the depth of your music taste. Explore your listening habits,
          find rare gems, and see how your favorites compare to the world.
        </motion.p>

        <motion.div className="flex items-center justify-center p-8">
          <a
            href={loginEndPoint}
            className="text-white font-outfit font-semibold drop-shadow-neon text-xl p-4 bg-green-500 rounded"
          >
            Login
          </a>
        </motion.div>

        {/* Note Toggle Button */}
        <div className="absolute top-8 right-8">
          <motion.button
            onClick={() => setShowNote(!showNote)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-green-600 text-white font-medium rounded shadow-md"
          >
            {showNote ? 'Close' : 'Note'}
          </motion.button>

          <AnimatePresence>
            {showNote && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mt-2 p-4 bg-black/70 border border-green-500 rounded text-sm text-green-100 max-w-xs shadow-lg"
              >
                ⚠️ Due to Spotify’s policy, this app runs in development mode
                and is only accessible to whitelisted Spotify accounts.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

export default Home