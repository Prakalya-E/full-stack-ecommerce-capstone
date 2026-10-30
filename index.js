import express from 'express';
import cors from 'cors';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5000;
const dataFile = path.join(__dirname, 'data', 'products.json');
app.use(cors());
app.use(express.json());

const readProducts = () => JSON.parse(fs.readFileSync(dataFile, 'utf8'));
const writeProducts = (products) => fs.writeFileSync(dataFile, JSON.stringify(products, null, 2));

app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'Northstar Product API' }));
app.get('/api/categories', (_req, res) => {
  const categories = [...new Set(readProducts().map((p) => p.category))].sort();
  res.json(categories);
});
app.get('/api/products', (req, res) => {
  const { search = '', category = 'All', sort = 'featured' } = req.query;
  let products = readProducts();
  if (category !== 'All') products = products.filter((p) => p.category.toLowerCase() === String(category).toLowerCase());
  if (search) {
    const term = String(search).toLowerCase();
    products = products.filter((p) => `${p.name} ${p.category} ${p.description}`.toLowerCase().includes(term));
  }
  if (sort === 'price-low') products.sort((a, b) => a.price - b.price);
  if (sort === 'price-high') products.sort((a, b) => b.price - a.price);
  if (sort === 'rating') products.sort((a, b) => b.rating - a.rating);
  res.json({ count: products.length, products });
});
app.get('/api/products/:id', (req, res) => {
  const product = readProducts().find((p) => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});
// Demo admin endpoint: add a product. In a real deployment, protect this route with authentication.
app.post('/api/products', (req, res) => {
  const { name, category, price, description, image } = req.body;
  if (!name || !category || !Number.isFinite(Number(price)) || Number(price) <= 0) {
    return res.status(400).json({ message: 'Name, category and a valid positive price are required.' });
  }
  const products = readProducts();
  const product = { id: Math.max(0, ...products.map((p) => p.id)) + 1, name: String(name), category: String(category), price: Number(price), oldPrice: Number(price), rating: 0, stock: 0, tag: 'New', description: String(description || ''), image: String(image || 'https://placehold.co/900x700?text=New+Product') };
  products.push(product);
  writeProducts(products);
  res.status(201).json(product);
});

const clientDist = path.resolve(__dirname, '../dist');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get('*', (_req, res) => res.sendFile(path.join(clientDist, 'index.html')));
}
app.listen(PORT, () => console.log(`Northstar API running on port ${PORT}`));
