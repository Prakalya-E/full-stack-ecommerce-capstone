const KEY="shopvista-cart-v1";
export function getCart(){try{return JSON.parse(localStorage.getItem(KEY))||[]}catch{return []}}
export function saveCart(cart){localStorage.setItem(KEY,JSON.stringify(cart));window.dispatchEvent(new Event("cartchange"))}
export function addToCart(id){const cart=getCart(),item=cart.find(x=>x.id===id);if(item)item.qty++;else cart.push({id,qty:1});saveCart(cart)}
export function updateQty(id,delta){const cart=getCart().map(x=>x.id===id?{...x,qty:x.qty+delta}:x).filter(x=>x.qty>0);saveCart(cart)}
export function removeFromCart(id){saveCart(getCart().filter(x=>x.id!==id))}
export function cartCount(){return getCart().reduce((n,x)=>n+x.qty,0)}
