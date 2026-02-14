"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

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
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
      } else {
        setUser(session.user);
        fetchBookmarks();
      }
    };

    checkSession();
    const channel = supabase
      .channel("realtime-bookmarks")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookmarks" },
        () => {
          fetchBookmarks();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (!user) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-xl mb-4">Dashboard</h1>
      <button
        onClick={async () => {
          await supabase.auth.signOut();
          router.push("/login");
        }}
        className="mb-4 bg-gray-800 text-white px-4 py-2 rounded"
      >
        Logout
      </button>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.target as any;
          const title = form.title.value;
          const url = form.url.value;

          await supabase
            .from("bookmarks")
            .insert([{ title, url, user_id: user.id }]);

          form.reset();
          fetchBookmarks();
        }}
        className="flex flex-col gap-2 max-w-md"
      >
        <input
          name="title"
          placeholder="Title"
          className="border p-2"
          required
        />
        <input name="url" placeholder="URL" className="border p-2" required />
        <button className="bg-black text-white p-2 rounded">
          Add Bookmark
        </button>
      </form>

      <div className="mt-6">
        {bookmarks.map((b) => (
          <div
            key={b.id}
            className="border p-2 mb-2 flex justify-between items-center"
          >
            <div>
              <a href={b.url} target="_blank" className="font-semibold underline">
  {b.title}
</a>

              <a href={b.url} target="_blank" className="text-blue-500">
                {b.url}
              </a>
            </div>

            <button
              onClick={async () => {
                await supabase.from("bookmarks").delete().eq("id", b.id);
                fetchBookmarks();
              }}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
        {bookmarks.length === 0 && (
    <p className="text-gray-500 mt-4">No bookmarks yet</p>
  )}
      </div>
    </div>
  );
}
