# Brainy95 - Premium Spaced Repetition App 🧠⚡️💎

A modern, intelligent flashcard learning platform inspired by Anki, built for high-performance memorization and academic excellence.

## ✨ Features
- **Intelligent Scheduling:** Powered by the SM-2 algorithm.
- **Premium Design:** Emerald & Gold aesthetic with Glassmorphism and 3D flip animations.
- **Cross-Platform:** Responsive web app for mobile and desktop.
- **Deck Management:** Organize your study materials into custom collections.

## 🛠️ Tech Stack
- **Frontend:** React + Vite + Tailwind CSS + Framer Motion.
- **Backend:** Node.js + Express + JWT.
- **Database:** MongoDB Atlas.

---

## 🚀 Local Setup Instructions

### 1. Prerequisites
- Node.js (v16+)
- MongoDB Atlas account (or local MongoDB)

### 2. Backend Setup
1. Navigate to `/server`.
2. Create a `.env` file from the provided template.
3. Add your `MONGO_URI` and `JWT_SECRET`.
4. Run `npm install`.
5. Start server: `npm start`.

### 3. Frontend Setup
1. Navigate to `/client`.
2. Run `npm install`.
3. Start dev server: `npm run dev`.

---

## ⛅ Deployment Guide

### Frontend (Cloudflare Pages)
1. Connect your GitHub repository to Cloudflare Pages.
2. Build command: `npm run build`.
3. Build output directory: `dist`.

### Backend (Render.com)
1. Link your GitHub repo to Render.
2. Select "Web Service".
3. Add your environment variables (`MONGO_URI`, `JWT_SECRET`).
4. Update the `axios` base URL in the frontend to point to your Render URL.

---

## 📖 SM-2 Algorithm Legend
- **Easy (5):** Mastered. Card interval increases significantly.
- **Medium (3):** Remembered. Moderate interval increase.
- **Hard (1):** Struggled. Card will appear again very soon.

Developed with ⚖️ and ⚡️ for the +95 goal.
