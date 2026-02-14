"use client";

import { supabase } from "@/lib/supabaseClient";

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
    <div className="flex items-center justify-center h-screen">
      <button
        onClick={loginWithGoogle}
        className="px-6 py-3 bg-black text-white rounded"
      >
        Login with Google
      </button>
    </div>
  );
}
