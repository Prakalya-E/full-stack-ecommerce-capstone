export const products = [
  {id:1,name:"Everyday Ceramic Mug",category:"Home",price:549,tag:"BESTSELLER",image:"https://images.unsplash.com/photo-1514228742587-6b1558f?auto=format&fit=crop&w=800&q=80"},
  {id:2,name:"Sculpted Table Lamp",category:"Home",price:2499,tag:"NEW",image:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80"},
  {id:3,name:"Canvas Weekender",category:"Accessories",price:1899,tag:"POPULAR",image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80"},
  {id:4,name:"Daily Notes Journal",category:"Stationery",price:399,tag:"",image:"https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=800&q=80"},
  {id:5,name:"Minimal Desk Clock",category:"Lifestyle",price:1299,tag:"NEW",image:"https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=800&q=80"},
  {id:6,name:"Soft Cotton Throw",category:"Home",price:1599,tag:"",image:"https://images.unsplash.com/photo-1600369671236-e74521d4b6ad?auto=format&fit=crop&w=800&q=80"},
  {id:7,name:"Everyday Bottle",category:"Accessories",price:799,tag:"",image:"https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80"},
  {id:8,name:"Pocket Sketchbook",category:"Stationery",price:299,tag:"",image:"https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80"}
];
export const money = amount => new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(amount);
