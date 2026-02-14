# Smart Bookmark App

Live URL:
https://smartbookmainapp.vercel.app

GitHub Repo:
<your repo link>

Tech Stack:
- Next.js (App Router)
- Supabase (Auth, Database, Realtime)
- Tailwind CSS
- Vercel (Deployment)

Features:
- Google OAuth login only
- Add bookmarks (title + URL)
- Private bookmarks per user
- Delete bookmarks
- Real-time updates across tabs

Problems Faced and Solutions:

1. Google OAuth redirect not working
Solution:
Added correct redirect URI in Google Cloud and Supabase URL configuration.

2. Session not persisting after login
Solution:
Used supabase.auth.getSession() to restore session.

3. Realtime not updating
Solution:
Subscribed to postgres_changes channel and refetched bookmarks.

4. Deployment login issue
Solution:
Added Vercel domain in Google OAuth and Supabase settings.
