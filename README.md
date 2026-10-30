# Northstar — Full-Stack Product Catalogue

A responsive e-commerce product catalogue capstone built with **React + Vite** on the frontend and **Node.js + Express** on the backend. It demonstrates modular UI components, client-side filtering, REST API integration, cart interactions, asset loading and production deployment.

## Features
- Responsive product catalogue with product cards
- Search by product name, category or description
- Category filtering and sorting by price/rating
- Product detail API endpoint
- Shopping bag with quantity controls and subtotal
- REST API for products and categories
- Demo endpoint to add a product (`POST /api/products`)
- Express serves the production frontend after build

## Tech stack
- React 18, Vite, JavaScript
- Node.js, Express
- Lucide React icons
- JSON file for sample product data

## Run locally

1. Install Node.js 20 or later.
2. Download/clone this repository.
3. In the project folder, install dependencies:

   ```bash
   npm install
   ```

4. Start frontend and backend together:

   ```bash
   npm run dev
   ```

5. Open `http://localhost:5173`.

The frontend proxies `/api` requests to `http://localhost:5000`.

## API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | API health check |
| GET | `/api/categories` | List categories |
| GET | `/api/products` | List/search/filter/sort products |
| GET | `/api/products/:id` | Get one product |
| POST | `/api/products` | Add a demo product |

Examples:
- `/api/products?search=watch`
- `/api/products?category=Home&sort=price-low`

Example POST body:

```json
{
  "name": "Desk organiser",
  "category": "Home",
  "price": 899,
  "description": "A simple organiser for your workspace.",
  "image": "https://example.com/image.jpg"
}
```

> The sample POST route is intentionally unauthenticated for a learning demo. Add authentication, validation, rate limiting and a database before using it for a real store. The cart and checkout are frontend demonstrations; no payment is collected.

## Production build

```bash
npm run build
npm start
```

The Express server serves the built `dist` folder and the API from the same origin. Set the deployment platform's `PORT` environment variable if required.

## Deploy using Render (single service)

1. Push this project to a GitHub repository.
2. In Render, create **New → Web Service** and connect the repository.
3. Runtime: Node. Build command: `npm install && npm run build`.
4. Start command: `npm start`.
5. Deploy. Render provides the public URL.

For Vercel, deploy the frontend separately and deploy the Express API to Render/Railway; then configure the frontend API base URL and CORS for that domain. The current Vite proxy is for local development.

## GitHub upload

```bash
git init
git add .
git commit -m "Build full-stack product catalogue capstone"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Replace the GitHub URL with your own repository URL.
