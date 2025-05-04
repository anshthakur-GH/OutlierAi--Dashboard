# OutlierAI Dashboard - Vercel Deployment

## Project Structure
- `index.html` (homepage)
- `dashboard.html` (dashboard page)
- `navbar.html` (navbar component/page)
- `dashboard.css`, `navbar.css` (styles)
- `dashboard.js` (scripts)
- `Images/` (image assets)
- `vercel.json` (Vercel configuration)

## How to Deploy on Vercel
1. Push this folder to a GitHub repository.
2. Go to [Vercel](https://vercel.com/) and sign in.
3. Click **New Project** and import your GitHub repo.
4. For **Framework Preset**, select **Other** (since it's a static site).
5. Set the root directory to this folder (if prompted).
6. Click **Deploy**.

### Custom Routing
- `/dashboard` → `dashboard.html`
- `/navbar` → `navbar.html`

### Notes
- Ensure your homepage is `index.html`.
- All assets (CSS, JS, Images) must be in the root or referenced folders.
- No backend/server code is included; for dynamic/serverless functions, add an `api/` directory as per Vercel docs.

---
For more, see the [Vercel Static Hosting Docs](https://vercel.com/docs/concepts/projects/overview#project-structure).
