import { motion } from "framer-motion";

export default function FramerTest() {
  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-white text-4xl font-bold"
      >
        Framer Motion Test - If you see this, animations work!
      </motion.div>
    </div>
  );
}
