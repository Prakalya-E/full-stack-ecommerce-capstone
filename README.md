# ShopVista — Frontend Capstone

A responsive, frontend-only e-commerce product catalog built with HTML, CSS and vanilla JavaScript ES modules.

## Features
- Modular JavaScript files (`data`, `store`, `components`, `app`)
- Client-side hash routing: Home, Shop, About and Bag
- Product catalog with category filters, search and sorting
- Add-to-bag, quantity updates and remove actions
- Cart persists in `localStorage`
- Responsive layouts for mobile, tablet and desktop
- Lazy-loaded product images and lightweight dependency-free code

## Run locally
Because this project uses JavaScript modules, run it through a local web server (not by opening `index.html` directly).

**VS Code:** Install the Live Server extension, right-click `index.html`, then choose **Open with Live Server**.

**Python alternative:**
```bash
python -m http.server 5500
```
Open `http://localhost:5500`.

## Publish with GitHub Pages
1. Create a new **public** repository on GitHub.
2. Upload the contents of this ZIP to the repository root (upload `index.html`, `styles.css`, `js/`, and `README.md`; do not upload an extra enclosing folder).
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then click **Save**.
6. Wait for the Pages deployment. GitHub will show the public website URL in **Settings → Pages**, usually `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`.

## Important
This is a frontend capstone demo. The cart works in the browser and is saved locally, but there is no backend, user authentication, inventory database, order processing, or real payment gateway. The newsletter and checkout actions are clearly marked demo interactions. Product images are loaded from Unsplash and therefore need an internet connection.

## Customize
- Product details and image URLs: `js/data.js`
- Page rendering and routes: `js/app.js`
- Cart storage: `js/store.js`
- Shared UI helpers: `js/components.js`
- Visual design: `styles.css`
