# ShopVista — E-commerce Frontend Capstone

Responsive frontend-only e-commerce catalog built with HTML, CSS and modular vanilla JavaScript ES modules.

## Features
- Client-side hash routing: Home, Shop, About and Bag
- Product catalog with category filters, search and sorting
- Add-to-bag, quantity updates and remove actions
- Cart persists in browser localStorage
- Responsive desktop, tablet and mobile layout
- Lazy-loaded product images; no build step or dependencies

## Run locally
Run a local server from the repository root:
```bash
python -m http.server 5500
```
Open http://localhost:5500.

## GitHub Pages
1. Open repository Settings → Pages.
2. Choose **GitHub Actions** as the Build and deployment source.
3. The workflow in `.github/workflows/deploy.yml` deploys on every push to `main`.
4. Once the workflow succeeds, the public site is:
   https://Prakalya-E.github.io/full-stack-ecommerce-capstone/

## Structure
- `index.html` — application entry
- `styles.css` — responsive styles
- `app.js` — page rendering and hash-based routes
- `components.js` — reusable product card and UI helpers
- `data.js` — demo products
- `store.js` — localStorage cart functions
- `.github/workflows/deploy.yml` — Pages deployment workflow

## Demo limitations
Frontend demo only: no backend, authentication, inventory database, order processing, newsletter service or real payment gateway. Checkout and newsletter interactions are demo-only. Product photos and Google Fonts load externally and require internet access.
