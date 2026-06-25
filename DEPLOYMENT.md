# Deploying Your Portfolio Publicly

This makes your portfolio visible to anyone on the internet, not just your
laptop. It also locks down `/admin` with a password, since anyone could
otherwise find that URL once it's public.

Free path: **Render** for the backend, **Vercel** for the frontend.
Total time: ~15 minutes. You'll need a free GitHub account if you don't
have one already (both Render and Vercel deploy from a GitHub repo).

---

## 0. Push this project to GitHub

1. Create a new GitHub repository (e.g. `portfolio`)
2. Push the `full-project` folder's contents to it:

```bash
cd full-project
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

---

## 1. Deploy the backend (Render)

1. Go to **render.com** → sign up / log in with GitHub
2. Click **New +** → **Web Service**
3. Connect your `portfolio` repo
4. Set:
   - **Root Directory**: `backend`
   - **Runtime**: Java
   - **Build Command**: `mvn clean package -DskipTests`
   - **Start Command**: `java -jar target/backend-1.0.0.jar`
   - **Plan**: Free
5. Under **Environment Variables**, add:
   - `ADMIN_PASSWORD` = (choose a real password — this protects `/admin`)
   - `FRONTEND_URL` = leave blank for now, you'll fill this in after step 2
6. Under **Disks** (so your database survives restarts/redeploys):
   - Add a disk, mount path: `/opt/render/project/src`, size: 1 GB
   - Add another env var: `DB_PATH` = `/opt/render/project/src/portfolio.db`
   - Add another env var: `UPLOAD_DIR` = `/opt/render/project/src/uploads`
7. Click **Create Web Service**. First build takes a few minutes.
8. Once live, copy your backend's URL — looks like
   `https://portfolio-backend-xxxx.onrender.com`

   Test it: visit `https://your-backend-url.onrender.com/api/projects`
   in a browser — you should see `[]`.

   **Note (free tier):** Render's free web services spin down after 15
   minutes of inactivity and take ~30-60 seconds to wake up on the next
   request. Your portfolio will still work — just the first visit after
   idle time will feel slightly slow while it wakes up.

---

## 2. Deploy the frontend (Vercel)

1. Go to **vercel.com** → sign up / log in with GitHub
2. Click **Add New** → **Project**
3. Import your `portfolio` repo
4. Set:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Vite (should auto-detect)
5. Under **Environment Variables**, add:
   - `VITE_API_BASE_URL` = your Render backend URL from step 1
     (e.g. `https://portfolio-backend-xxxx.onrender.com`)
6. Click **Deploy**.
7. Once live, copy your frontend's URL — looks like
   `https://portfolio-yourname.vercel.app`

---

## 3. Connect them (finish CORS setup)

Go back to **Render** → your backend service → Environment Variables →
set `FRONTEND_URL` to your actual Vercel URL from step 2
(e.g. `https://portfolio-yourname.vercel.app`). Save — Render will
redeploy automatically.

This tells the backend "only allow requests from this exact frontend,"
which keeps random other websites from calling your API.

---

## 4. Test it

- Visit your Vercel URL — anyone, anywhere, can now see your portfolio
- Visit `https://your-vercel-url/admin` — you'll see a password screen
- Enter the `ADMIN_PASSWORD` you set in step 1 — you're in
- Add a project — it should appear immediately on the Home page

---

## How the password protection works

- `/admin` is not linked anywhere on the public site, but that alone
  isn't real security once a site is public — anyone could guess or
  stumble on the URL.
- Now, adding/deleting a project requires a password, checked by the
  **backend itself** (not just hidden by the frontend). Even someone
  calling the API directly with a tool like `curl`, bypassing your
  website entirely, gets rejected with `401 Unauthorized` if they don't
  know the password.
- The password is never stored in your code — only as an environment
  variable on Render. It's safe to put this project on a public GitHub
  repo.
- In the browser, after logging in, the password is kept only in
  `sessionStorage` (cleared when you close the tab) — never written to
  localStorage or cookies, and never sent anywhere except to your own
  backend.

---

## Updating your site later

Any time you push new commits to GitHub, both Render and Vercel
auto-redeploy. No manual redeploy step needed.

## Costs

Both Render's and Vercel's free tiers are genuinely free — no credit
card required for this kind of small personal project, as of when this
was written. Render's free tier sleeps when idle (see note in step 1);
Vercel's free tier has no such limitation for static frontends.
