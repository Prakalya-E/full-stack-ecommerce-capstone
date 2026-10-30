import {products,money} from "./data.js";
import {addToCart,cartCount} from "./store.js";
export function productCard(p){return `<article class="product-card"><div class="product-image"><img loading="lazy" src="${p.image}" alt="${p.name}" onerror="this.src='https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=800&q=80'">${p.tag?`<span class="product-tag">${p.tag}</span>`:""}<button class="quick-add" data-add="${p.id}">＋ Add to bag</button></div><div class="product-info"><h3>${p.name}</h3><div class="product-meta"><span>${p.category}</span><strong>${money(p.price)}</strong></div></div></article>`}
export function bindAddButtons(){document.querySelectorAll("[data-add]").forEach(b=>b.addEventListener("click",()=>{addToCart(Number(b.dataset.add));toast("Added to your bag") }))}
export function updateCartCount(){const el=document.getElementById("cart-count");if(el)el.textContent=cartCount()}
let toastTimer;export function toast(message){const el=document.getElementById("toast");if(!el)return;el.textContent=message;el.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),2200)}
export function renderGrid(target,list){target.innerHTML=list.map(productCard).join("");bindAddButtons()}
