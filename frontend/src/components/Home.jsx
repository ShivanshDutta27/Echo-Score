import Aurora from './Aurora';
import { motion } from 'framer-motion';

const Home = ({loginEndPoint}) => {
  // Variants for container (to stagger children animations)
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Variants for the heading animation
  const headingVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  // Variants for the subheading animation
  const subheadingVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative w-full h-screen flex flex-col overflow-hidden">
      {/* Aurora as Background */}
      <div className="absolute inset-0 -z-10">
        <Aurora colorStops={[ "#00FF00", "#000000","#00FF00",]} speed={0.5} />
      </div>

      {/* Content Layer with Framer Motion */}
      <motion.div
        className="relative p-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-8xl font-bold text-white drop-shadow-lg"
          variants={headingVariants}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Echo Score
        </motion.h1>
        <motion.p
          className="mt-4 text-lg md:text-xl text-gray-200 tracking-wide leading-relaxed font-serif"
          variants={subheadingVariants}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
        >
          Uncover the depth of your music taste. Explore your listening habits, 
          find rare gems, and see how your favorites compare to the world.
        </motion.p>
        <motion.div className="flex items-center justify-center p-8">
                  <a href={loginEndPoint} className="text-white font-outfit font-semibold   drop-shadow-neon text-xl p-4 bg-green-500 rounded">
                    Login
                  </a>
                </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
