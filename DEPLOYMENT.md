# Deployment Guide for KidEduQuest

Since your application uses a **MySQL Database**, a **Node.js Backend**, and a **React Frontend**, you need to host text 3 parts separately (or together on a VPS). 

Here is the best **Free Tier** strategy:

## 1. Database (MySQL) -> TiDB Cloud (Recommended Free)
TiDB Cloud offers a generous "Serverless" free tier for MySQL-compatible databases.

1.  Go to [TiDB Cloud](https://tidbcloud.com/) and sign up.
2.  Create a "Serverless Tier" cluster.
3.  Once created, click **Connect** to get your connection details.
4.  You will need:
    *   Host
    *   User
    *   Password
    *   Port (usually 4000)
    *   Database Name (Create one called `kideduquest`)

## 2. Backend (Node.js) -> Render.com
Render works great for Node.js backends.

1.  Push your latest code to GitHub.
2.  Go to [Render.com](https://render.com/) and sign up.
3.  Click **New +** -> **Web Service**.
4.  Connect your GitHub repository (`KidEduQuest`).
5.  **Settings**:
    *   **Root Directory**: `server`
    *   **Build Command**: `npm install`
    *   **Start Command**: `node index.js`
    *   **Environment Variables** (Add these from your TiDB details):
        *   `DB_HOST`: (Your TiDB Host)
        *   `DB_USER`: (Your TiDB User)
        *   `DB_PASSWORD`: (Your TiDB Password)
        *   `DB_PORT`: `4000` (Important: Add this support to db.js if not present, check config!)
        *   `DB_NAME`: `kideduquest`
        *   `PORT`: `10000` (Render sets this auto, but good to know)
6.  Click **Create Web Service**. 
7.  Wait for it to deploy. Render will give you a URL like `https://kideduquest-api.onrender.com`. **Copy this URL.**

## 3. Frontend (React) -> Vercel
Vercel is the authentic home for React apps.

1.  Go to [Vercel.com](https://vercel.com/) and sign up.
2.  Click **Add New...** -> **Project**.
3.  Import your GitHub repository (`KidEduQuest`).
4.  **Settings**:
    *   **Framework Preset**: Vite (should detect auto).
    *   **Root Directory**: `./` (default).
    *   **Environment Variables**:
        *   `VITE_API_URL`: `https://kideduquest-api.onrender.com/api` (Paste your Render Backend URL here and append `/api`)
5.  Click **Deploy**.

## 4. Final Setup (Important!)
Once verified:
1.  Run the Initialization Script on your PROD database? 
    *   Since you can't run `node scripts/initDb.js` easily on Render, you should connect to your Remote DB (TiDB) from your **Local Machine** once to set up the tables.
    *   Update your local `.env` temporarily with TiDB credentials.
    *   Run `node server/scripts/initDb.js` locally.
    *   This will create the tables in the cloud.

Now your app is live! 🚀

---

# Alternative: Single Platform Hosting (Railway)

If you prefer to host **everything in one place** (Database + Backend + Frontend), **Railway** is the easiest option.
*Note: Railway has a trial, but is eventually a paid service (approx $5/mo needed after trial).*

1.  Go to [Railway.app](https://railway.app/).
2.  **Create a Project** -> **Provision MySQL**.
    *   This gives you a database immediately.
3.  **Add Service** -> **GitHub Repo** -> Select `KidEduQuest`.
    *   **Root Directory**: `server`
    *   **Variables**: Add `DB_HOST`, `DB_USER`, `DB_PASSWORD` (use values from the MySQL service you just created in the same project).
4.  **Add Service** -> **GitHub Repo** -> Select `KidEduQuest` (again).
    *   This will be for the Frontend.
    *   **Root Directory**: `/` (Leave empty).
    *   **Build Command**: `npm run build`.
    *   **Start Command**: `npm run preview` (or serve `dist`).
    *   **Variables**: `VITE_API_URL` = (The URL of your Backend Service).

This method keeps all 3 parts in one visual dashboard!

---

# FAQ: Can I use "Infinity Free" or "GoDaddy" Shared Hosting?

**Short Answer**: **No**, not for the Backend.

**Reason**:
*   Infinity Free, HostGator, and standard GoDaddy plans are **PHP/HTML** hosts.
*   They **do not support Node.js** (which runs your `server/` folder).
*   You *could* host the React Frontend there (by uploading the `dist` folder), but your Backend would still need to live on Render or Railway. 

For modern full-stack JavaScript apps (MERN/PERN stack), you need **Cloud/VPS hosting** like Render, Railway, DigitalOcean, or Vercel.
