"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [bookmarks, setBookmarks] = useState<any[]>([]);

  const fetchBookmarks = async () => {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setBookmarks(data);
  };

  useEffect(() => {
    const init = async () => {
      await supabase.auth.exchangeCodeForSession();
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
      } else {
        setUser(session.user);
        fetchBookmarks();
      }
    };

    init();

    const channel = supabase
      .channel("realtime-bookmarks")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookmarks" },
        () => fetchBookmarks()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (!user) return <div className="p-6 text-white">Loading...</div>;

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="w-full max-w-2xl backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 shadow-xl">

        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-white">
            My Bookmarks
          </h1>

          <button
            onClick={async () => {
              await supabase.auth.signOut();
              router.push("/login");
            }}
            className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.target as any;
            const title = form.title.value;
            const url = form.url.value;

            await supabase.from("bookmarks").insert([
              { title, url, user_id: user.id }
            ]);

            form.reset();
          }}
          className="flex flex-col gap-2 mb-6"
        >
          <input
            name="title"
            placeholder="Bookmark title"
            className="border border-white/20 bg-white/10 text-white p-2 rounded outline-none"
            required
          />
          <input
            name="url"
            placeholder="https://example.com"
            className="border border-white/20 bg-white/10 text-white p-2 rounded outline-none"
            required
          />

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded shadow"
          >
            Add Bookmark
          </motion.button>
        </form>

        <div>
          {bookmarks.map((b) => (
            <motion.div
              key={b.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white/10 border border-white/20 p-3 rounded-lg mb-3 flex justify-between items-center"
            >
              <div>
                <a
                  href={b.url}
                  target="_blank"
                  className="text-white font-semibold underline"
                >
                  {b.title}
                </a>
                <p className="text-gray-300 text-sm break-all">{b.url}</p>
              </div>

              <button
                onClick={async () => {
                  await supabase.from("bookmarks").delete().eq("id", b.id);
                }}
                className="bg-red-500 hover:bg-red-400 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </motion.div>
          ))}

          {bookmarks.length === 0 && (
            <p className="text-gray-400 mt-4 text-center">
              No bookmarks yet
            </p>
          )}
        </div>

      </div>
    </motion.div>
  );
}
