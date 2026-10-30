import { useEffect, useMemo, useState } from 'react';
import { Search, ShoppingBag, SlidersHorizontal, Star, ArrowUpRight, X, Plus, Minus, Menu, Sparkles, PackageCheck } from 'lucide-react';

const money = (n) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

export default function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('featured');
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => { fetch('/api/categories').then(r => r.json()).then(c => setCategories(['All', ...c])).catch(() => {}); }, []);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    const params = new URLSearchParams({ search, category, sort });
    fetch(`/api/products?${params}`, { signal: controller.signal })
      .then(r => { if (!r.ok) throw new Error('Could not load products'); return r.json(); })
      .then(data => { setProducts(data.products); setError(''); })
      .catch(e => { if (e.name !== 'AbortError') setError('The product service is unavailable. Start the API server and refresh.'); })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [search, category, sort]);

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartItems = useMemo(() => Object.entries(cart).map(([id, qty]) => ({ ...products.find(p => p.id === Number(id)), qty })).filter(p => p.id), [cart, products]);
  const total = cartItems.reduce((sum, p) => sum + p.price * p.qty, 0);
  const changeQty = (id, delta) => setCart(prev => { const next = { ...prev }; const qty = (next[id] || 0) + delta; if (qty <= 0) delete next[id]; else next[id] = qty; return next; });

  return <div className="app-shell">
    <div className="announcement"><Sparkles size={14}/> Thoughtful finds for your everyday <span>·</span> Free delivery on orders over ₹2,000</div>
    <header className="header wrap">
      <a className="brand" href="#top"><span className="brand-mark">n.</span><span>NORTHSTAR<small>OBJECTS FOR EVERYDAY</small></span></a>
      <nav><a href="#catalog">Shop</a><a href="#story">Our story</a><a href="#footer">Contact</a></nav>
      <button className="cart-button" onClick={() => setCartOpen(true)} aria-label="Open shopping bag"><ShoppingBag size={19}/><span>Bag</span>{cartCount > 0 && <b>{cartCount}</b>}</button>
    </header>

    <main id="top">
      <section className="hero wrap">
        <div className="hero-copy"><div className="eyebrow"><span/> THE EVERYDAY EDIT — 2026</div><h1>Good things.<br/><em>Better living.</em></h1><p>Considered essentials, little upgrades and timeless pieces to make every day feel a bit more yours.</p><a className="primary-link" href="#catalog">Explore the collection <ArrowUpRight size={17}/></a><div className="hero-note"><span>✳</span> Curated with care. Made to be loved.</div></div>
        <div className="hero-art"><img src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=1200&q=85" alt="Calm, minimal home interior"/><div className="floating-note"><span>THE NORTHSTAR PICK</span><strong>Make room<br/>for good design.</strong></div><div className="hero-index">01 / 04</div></div>
      </section>

      <section className="benefits wrap"><div><PackageCheck/><span><b>Carefully selected</b><small>Quality over quantity</small></span></div><div><Sparkles/><span><b>Little details matter</b><small>Designed for daily life</small></span></div><div><ShoppingBag/><span><b>Easy shopping</b><small>Simple, secure experience</small></span></div></section>

      <section className="catalog wrap" id="catalog">
        <div className="section-heading"><div><div className="eyebrow">A FEW OF OUR FAVOURITES</div><h2>The collection<span>.</span></h2></div><p>Useful things, beautiful things,<br/>and everything in between.</p></div>
        <div className="toolbar"><div className="category-list">{categories.map(c => <button key={c} className={category === c ? 'active' : ''} onClick={() => setCategory(c)}>{c}</button>)}</div><div className="filters"><label className="search-box"><Search size={16}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Find something..."/></label><label className="sort-box"><SlidersHorizontal size={15}/><select value={sort} onChange={e => setSort(e.target.value)}><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="rating">Top rated</option></select></label></div></div>
        <div className="result-line">{loading ? 'Finding your favourites…' : `${products.length} thoughtfully picked items`} <span>Prices inclusive of taxes</span></div>
        {error && <div className="error-box">{error}</div>}
        {loading ? <div className="loading-grid">{[1,2,3,4].map(x => <div className="skeleton" key={x}/>)}</div> : <div className="product-grid">{products.map((p, i) => <article className="product-card" key={p.id}><div className="product-image"><img src={p.image} alt={p.name} loading="lazy"/><span className="product-tag">{p.tag}</span><button className="quick-add" onClick={() => changeQty(p.id, 1)} aria-label={`Add ${p.name} to bag`}><Plus size={18}/></button></div><div className="product-meta"><span>{p.category}</span><span className="rating"><Star size={12} fill="currentColor"/> {p.rating ? p.rating.toFixed(1) : 'New'}</span></div><h3>{p.name}</h3><p className="description">{p.description}</p><div className="price-row"><strong>{money(p.price)}</strong>{p.oldPrice > p.price && <del>{money(p.oldPrice)}</del>}<span>{p.stock > 0 ? 'In stock' : 'Made to order'}</span></div></article>)}</div>}
        {!loading && !error && products.length === 0 && <div className="empty-state"><Search size={25}/><h3>No matches just yet</h3><p>Try another search or choose a different category.</p><button onClick={() => {setSearch('');setCategory('All');}}>Clear filters</button></div>}
      </section>

      <section className="story wrap" id="story"><div className="story-image"><img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1100&q=85" alt="Warm and considered living space"/></div><div className="story-copy"><div className="eyebrow">A LITTLE ABOUT US</div><h2>Less noise.<br/><em>More meaning.</em></h2><p>Northstar is a concept store for the everyday. We believe the objects around us should be useful, thoughtfully made and a joy to live with.</p><a href="#catalog" className="text-link">Find your next favourite <ArrowUpRight size={16}/></a></div></section>
    </main>

    <footer id="footer"><div className="wrap footer-inner"><a className="brand footer-brand" href="#top"><span className="brand-mark">n.</span><span>NORTHSTAR<small>OBJECTS FOR EVERYDAY</small></span></a><p>Good things for everyday living.</p><span>© 2026 Northstar. Capstone demo project.</span></div></footer>

    {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={e => e.stopPropagation()}><div className="drawer-head"><div><span className="eyebrow">YOUR PICKS</span><h2>Your bag <span>({cartCount})</span></h2></div><button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Close bag"><X/></button></div>{cartItems.length === 0 ? <div className="empty-cart"><ShoppingBag size={34}/><h3>Your bag is taking a break.</h3><p>Add something lovely from the collection.</p><button className="dark-button" onClick={() => setCartOpen(false)}>Continue browsing</button></div> : <><div className="cart-list">{cartItems.map(p => <div className="cart-item" key={p.id}><img src={p.image} alt=""/><div className="cart-item-info"><b>{p.name}</b><strong>{money(p.price)}</strong><div className="quantity"><button onClick={() => changeQty(p.id, -1)}><Minus size={13}/></button><span>{p.qty}</span><button onClick={() => changeQty(p.id, 1)}><Plus size={13}/></button></div></div></div>)}</div><div className="cart-total"><span>Subtotal</span><strong>{money(total)}</strong></div><p className="demo-note">Demo checkout: no payment will be collected.</p><button className="dark-button" onClick={() => alert('This is a capstone demo. Connect a payment provider to enable checkout.')}>Continue to checkout <ArrowUpRight size={16}/></button></>}</aside></div>}
  </div>;
}
