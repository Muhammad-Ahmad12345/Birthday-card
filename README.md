Setup (local MongoDB)

1. Install Node.js (14+).
2. If you have MongoDB locally, ensure it's running (default at mongodb://127.0.0.1:27017).

Run backend:

```bash
cd "c:/Users/HPZBookFireFlyG8 A&I/Pictures/Birthday"
npm install
# optionally set MONGO_URI and DB_NAME
# Windows PowerShell example:
# $env:MONGO_URI='mongodb://127.0.0.1:27017'
npm start
```

What this does:
- Starts an Express server on port 3000 and listens at `/submit`.
- The frontend (`index.html`) will POST responses to `http://localhost:3000/submit` and also save them in `localStorage` under `rubina_responses`.

If you want the backend hosted, set `MONGO_URI` to your MongoDB Atlas connection string before running.

Option C — Permanent hosting (frontend + backend)

1) Backend (Render / Heroku / Railway / Vercel server):
- Ensure `MONGO_URI` (MongoDB Atlas) is set in service environment variables.
- Start command: `npm start` (server serves static files and API on the same port).
- On Render/Heroku set the `PORT` env var (these platforms set it automatically).

Example Render steps (summary):
- Push this folder to a public/private Git repo.
- Create a new Web Service on Render, connect the repo, and set the build command `npm install` and start command `npm start`.
- Set `MONGO_URI` and `DB_NAME` in Render environment settings.

2) Frontend (GitHub Pages / Netlify / Vercel) — optional if you prefer separate hosting:
- If you use the same backend to serve static files, you do not need separate frontend hosting.
- To host frontend separately (e.g., GitHub Pages), push `index.html` and assets to a repository and enable Pages; then update the fetch URL in `index.html` to point to your deployed backend (e.g. `https://your-backend.onrender.com/submit`).

3) Admin view and URL:
- Once deployed to a public host, the full site will be available at the service URL (e.g., `https://your-app.onrender.com`).
- Admin responses page: `https://your-app.onrender.com/index.html?admin=1` (or `https://your-app.onrender.com/?admin=1`).

Quick testing with ngrok (single-URL, fast):
- Run `npm start` locally, then:
```
npx ngrok http 3000
```
- Share the `https://*.ngrok.io` URL — it will serve the full site including admin view at `?admin=1`.

If you want, I can:
- Update `index.html` to use a configurable backend URL variable, or
- Make a small deployment guide with exact Render/GitHub steps and copy-paste env settings.
