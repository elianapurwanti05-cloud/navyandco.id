const WA="62881036235419";

let cart=[];
let selected=null;

/* RENDER PRODUK */
function render(data){
let h="";
data.forEach(p=>{
h+=`
<div class="card">
<h3>${p.name}</h3>
<button onclick="openModal('${p.name}')">Pilih</button>
</div>`;
});
document.getElementById("list").innerHTML=h;
renderCart();
}

/* FILTER */
function filter(c){
render(products.filter(p=>p.cat===c));
}

/* MODAL */
function openModal(name){
selected=products.find(p=>p.name===name);

let h="";
selected.paket.forEach((p,i)=>{
h+=`<div onclick="add(${i})">${p.name} - Rp ${p.price}</div>`;
});

document.getElementById("paketList").innerHTML=h;
document.getElementById("modal").style.display="flex";
}

function closeModal(){
document.getElementById("modal").style.display="none";
}

/* ADD CART */
function add(i){
cart.push(selected.paket[i]);
renderCart();
closeModal();
toast("Masuk keranjang");
}

/* CART */
function renderCart(){
let h="",total=0;

cart.forEach(c=>{
h+=`<div>${c.name} Rp ${c.price}</div>`;
total+=c.price;
});

document.getElementById("cartBox").innerHTML=h+"<hr>Total "+total;
document.getElementById("count").innerText=cart.length;
}

/* CHECKOUT */
function checkout(){
let msg="ORDER\n\n";
let total=0;

cart.forEach(c=>{
msg+=`- ${c.name} Rp ${c.price}\n`;
total+=c.price;
});

msg+=`\nTOTAL: Rp ${total}`;
window.open("https://wa.me/"+WA+"?text="+encodeURIComponent(msg));
}

/* CLEAR CART */
function clearCart(){
cart=[];
renderCart();
toast("Keranjang kosong");
}

/* TOGGLE CART */
function toggleCart(){
document.getElementById("cart").classList.toggle("active");
}

/* TOAST */
function toast(t){
let x=document.getElementById("toast");
x.innerText=t;
x.classList.add("show");
setTimeout(()=>x.classList.remove("show"),1500);
}