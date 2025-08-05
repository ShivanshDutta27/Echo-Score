import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Nav from "../util/Nav";
import obscurityMessages from "../util/constants"; 

const Dashboard = ({ obscurityData = [] }) => {
  const validObscurityData = Array.isArray(obscurityData) ? obscurityData : [];
  const totalUsers = validObscurityData.length;

  const avgObscurity =
    totalUsers > 0
      ? (
          validObscurityData.reduce((sum, user) => sum + (user.obscurity || 0), 0) /
          totalUsers
        ).toFixed(2)
      : 0;

  const messageIndex = Math.min(Math.floor(avgObscurity / 10), 9);
  const obscurityMessage = obscurityMessages[messageIndex] || "No data available.";

  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { triggerOnce: true, threshold: 0.3 });

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Nav />
        <div className="flex flex-col items-center justify-center text-center flex-grow space-y-4 py-12">
          <h1 className="text-[72px] font-bold font-outfit flex items-center">
            Welcome to Echo Score
            <span className="ml-1 text-green-400 animate-pulse">•</span>
          </h1>
          <p className="text-[32px] font-medium text-gray-600">
            Check out your stats below
          </p>
          <p className="text-sm text-gray-500">Made by Shivansh Dutta</p>
        </div>
      </div>

      {/* Obscurity Rating Section */}
      <div className="min-h-screen flex flex-col items-center justify-center text-center bg-stone-700">
        <h1 className="text-4xl font-bold font-outfit text-white flex flex-col items-center">
          Obscurity Rating
          <span className="w-24 h-1 bg-green-400 mt-2 rounded-full"></span>
        </h1>

        {/* Animated Card */}
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 2, ease: "easeOut" }}
          className="bg-white shadow-xl rounded-xl p-8 mt-6 max-w-md"
        >
          <h2 className="text-8xl font-bold text-gray-900">
            {avgObscurity}%
          </h2>
          <p className="text-gray-700 mt-4 text-lg">
            {totalUsers > 0 
              ? `Your music is more obscure than ${avgObscurity}% of our users.`
              : "No data available. Try listening to more music!"}
          </p>
          <p className="text-gray-600 mt-2">{obscurityMessage}</p>

          <button className="mt-6 px-6 py-3 bg-green-500 text-white text-lg font-medium rounded-lg hover:bg-green-600 transition">
            Scroll for Detailed Summary
          </button>
        </motion.div>
      </div>

      
    </>
  );
};

export default Dashboard;
