# Smart Bookmark App

A modern, minimal bookmark manager built with Next.js and Supabase.
Users can securely save, view, and manage private bookmarks with real-time updates.

---

## Live Demo

https://smartbookmainapp.vercel.app

---

## GitHub Repository

https://github.com/skverma2543/smart_bookmain_app

---

## Features

• Google OAuth authentication
• Private bookmarks per user (Row Level Security)
• Add and delete bookmarks
• Real-time updates across tabs
• Modern glassmorphism UI
• Animated interface with Framer Motion
• Responsive layout
• Deployed on Vercel

---

## Tech Stack

Frontend
Next.js (App Router)
Tailwind CSS
Framer Motion

Backend / Database
Supabase Auth
Supabase PostgreSQL
Supabase Realtime

Deployment
Vercel

---

## How It Works

1. User logs in using Google OAuth
2. Supabase creates a secure session
3. Bookmarks are stored with the user ID
4. Row Level Security ensures users only access their own data
5. Realtime subscriptions update the UI instantly

---

## Problems Faced and Solutions

Google OAuth redirect issues
Resolved by configuring redirect URLs correctly in Google Cloud and Supabase.

Session not persisting after login
Solved by restoring the session using supabase.auth.getSession().

Realtime updates not appearing instantly
Solved by combining realtime subscriptions with manual refresh after insert/delete.

Build failure on Vercel due to missing dependencies
Resolved by installing required packages and committing package.json.

OAuth code visible in URL
Handled by proper session handling and redirect configuration.

---

## Local Setup

Clone the repository

```
git clone https://github.com/skverma2543/smart_bookmain_app.git
cd smart_bookmain_app
```

Install dependencies

```
npm install
```

Create environment file

```
.env.local
```

Add:

```
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

Run locally

```
npm run dev
```

---

## Future Improvements

• Edit bookmarks
• Bookmark categories or tags
• Search and filtering
• Dark/light theme toggle
• Progressive Web App support

---

## Author

Shivam Kumar Verma
IT Engineer | Web Developer
