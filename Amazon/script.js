const products = [
{
id:1,
title:"Apple iPhone 15",
category:"Mobiles",
price:69999,
rating:4.6,
image:"https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=700"
},
{
id:2,
title:"Samsung Galaxy S24",
category:"Mobiles",
price:74999,
rating:4.5,
image:"https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=700"
},
{
id:3,
title:"OnePlus Nord CE",
category:"Mobiles",
price:24999,
rating:4.3,
image:"https://images.fonearena.com/blog/wp-content/uploads/2023/07/OnePlus-Nord-CE-3_fonearena-9-1024x682.jpg"
},
{
id:4,
title:"Wireless Headphones",
category:"Electronics",
price:2499,
rating:4.4,
image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700"
},
{
id:5,
title:"Bluetooth Speaker",
category:"Electronics",
price:1799,
rating:4.3,
image:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=700"
},
{
id:6,
title:"Smart Watch",
category:"Electronics",
price:3999,
rating:4.2,
image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700"
},
{
id:7,
title:"Gaming Laptop",
category:"Computers",
price:84999,
rating:4.7,
image:"https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=700"
},
{
id:8,
title:"MacBook Air M3",
category:"Computers",
price:92999,
rating:4.8,
image:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=700"
},
{
id:9,
title:"Mechanical Keyboard",
category:"Computers",
price:3499,
rating:4.4,
image:"https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=700"
},
{
id:10,
title:"Gaming Mouse",
category:"Computers",
price:1499,
rating:4.5,
image:"https://images.unsplash.com/photo-1527814050087-3793815479db?w=700"
},
{
id:11,
title:"Laptop Backpack",
category:"Fashion",
price:1299,
rating:4.1,
image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700"
},
{
id:12,
title:"Running Shoes",
category:"Fashion",
price:2199,
rating:4.5,
image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700"
},
{
id:13,
title:"Cotton T-Shirt",
category:"Fashion",
price:699,
rating:4.0,
image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=700"
},
{
id:14,
title:"Coffee Maker",
category:"Home",
price:4499,
rating:4.4,
image:"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=700"
},
{
id:15,
title:"Table Lamp",
category:"Home",
price:999,
rating:4.2,
image:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=700"
}
];

let cart = [];

function displayProducts(data){

let html = "";

data.forEach(product => {

html += `
<div class="product">

<img src="${product.image}" alt="${product.title}">

<h3>${product.title}</h3>

<p>⭐ ${product.rating}</p>

<div class="price">
₹${product.price.toLocaleString("en-IN")}
</div>

<div class="actions">

<button
class="add"
onclick="addToCart(${product.id})">
Add Cart
</button>

<button
class="buy"
onclick="buyNow('${product.title}')">
Buy Now
</button>

</div>

</div>
`;

});

if(data.length===0){

html=`
<div class="empty">
<h2>No Products Found</h2>
<p>Try another search.</p>
</div>
`;

}

document.getElementById("productGrid").innerHTML=html;
}

function addToCart(id){

const product =
products.find(item => item.id === id);

const existing =
cart.find(item => item.id === id);

if(existing){

existing.quantity++;

}else{

cart.push({
...product,
quantity:1
});

}

updateCart();
openCart();
}

function removeCart(id){

cart = cart.filter(
item => item.id !== id
);

updateCart();
}

function updateCart(){

let html="";
let total=0;
let items=0;

cart.forEach(item=>{

total += item.price * item.quantity;
items += item.quantity;

html += `
<div class="cartItem">

<img src="${item.image}">

<div>

<h4>${item.title}</h4>

<p>
₹${item.price.toLocaleString("en-IN")}
</p>

<p>
Qty : ${item.quantity}
</p>

<button
class="remove"
onclick="removeCart(${item.id})">
Remove
</button>

</div>

</div>
`;

});

if(cart.length===0){

html=`
<p class="emptyText">
Your cart is empty.
</p>
`;

}

document.getElementById("cartItems").innerHTML =
html;

document.getElementById("cartCount").innerText =
items;

document.getElementById("totalPrice").innerText =
total.toLocaleString("en-IN");
}

function buyNow(title){

alert(
"Order Confirmed!\n\n" +
title
);

}

function searchProducts(){

const text =
document
.getElementById("searchInput")
.value
.toLowerCase()
.trim();

const category =
document
.getElementById("categorySelect")
.value;

const filtered =
products.filter(product=>{

const searchMatch =

product.title
.toLowerCase()
.includes(text)

||

product.category
.toLowerCase()
.includes(text);

const categoryMatch =

category==="All"

||

product.category===category;

return searchMatch &&
categoryMatch;

});

displayProducts(filtered);
}

function openCart(){

document
.getElementById("cartOverlay")
.classList
.add("show");
}

function closeCart(){

document
.getElementById("cartOverlay")
.classList
.remove("show");
}

document
.getElementById("searchInput")
.addEventListener(
"input",
searchProducts
);

document
.getElementById("categorySelect")
.addEventListener(
"change",
searchProducts
);

displayProducts(products);
updateCart();
