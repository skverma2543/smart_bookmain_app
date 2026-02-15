"use client";

import { supabase } from "@/lib/supabaseClient";
import { motion } from "framer-motion";

export default function LoginPage() {

  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    });
  };

  return (
    <motion.div
      className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
       <div className="absolute w-72 h-72 bg-blue-500/30 rounded-full blur-3xl top-10 left-10"></div>
  <div className="absolute w-72 h-72 bg-purple-500/30 rounded-full blur-3xl bottom-10 right-10"></div>

      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-8 shadow-xl text-center max-w-md w-full">

        <h1 className="text-3xl font-bold text-white mb-2">
          Smart Bookmark
        </h1>

        <p className="text-gray-300 mb-6">
          Save, organize, and access your favorite links privately.
          Your bookmarks sync instantly across devices.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={loginWithGoogle}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg w-full"
        >
          Continue with Google
        </motion.button>

        <p className="text-gray-400 text-sm mt-6">
          Private • Secure • Real-time sync
        </p>

      </div>
    </motion.div>
  );
}
