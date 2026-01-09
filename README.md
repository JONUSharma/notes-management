📝 Private Notes App

A minimal, secure notes application where each user can create and view only their own notes. The app focuses on authentication, data ownership, and simplicity, not advanced productivity features.

🔒 Core Idea

Notes are private by default and strictly tied to the authenticated user.

There is:

No sharing

No public notes

No folders or tags

Just:

Login

Write

Read

Delete

Think of it as a personal scratchpad, not a productivity tool.

🧱 Tech Stack Frontend

React (Vite)

Supabase JS Client

Backend

Supabase (PostgreSQL)

Supabase Authentication

Row Level Security (RLS)

Deployment

Vercel (Frontend)

🌐 Live Demo 🔗 Live URL: https://notes-management-nine.vercel.app/

🚀 Getting Started (Local Setup)

Clone the repository git clonehttps://github.com/JONUSharma/notes-management

Install dependencies npm install

Environment Variables

Create a .env file: VITE_SUPABASE_URL=your_supabase_project_url VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

Run the app npm run dev
📌 Notes

No backend server is used

No sensitive keys are exposed

Email verification was disabled for demo simplicity

This project prioritizes correctness and security over features

👤 Author Jonu Sharma React
 • Node.js 
 • Supabase
 • PostgreSQL