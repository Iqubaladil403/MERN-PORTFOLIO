import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#0A192F] to-[#054e68] text-white text-center">
      <motion.h1
        className="text-9xl font-extrabold text-[#F97316] drop-shadow-lg"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        404
      </motion.h1>
      <motion.p
        className="text-2xl mt-4 text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        Oops! The page you're looking for doesn't exist.
      </motion.p>
      <motion.div
        className="mt-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
      >
        <Link
          to="/"
          className="px-6 py-3 text-lg font-semibold bg-[#F97316] text-white rounded-lg hover:bg-[#FF6A3D] transition-transform transform hover:scale-110 shadow-lg"
        >
          Go Home
        </Link>
      </motion.div>
    </div>
  );
}
