document.addEventListener("DOMContentLoaded",()=>{
 const page=document.body.dataset.page;
 const rootPrefix=page==="home"?"":"../";
 const menu=document.querySelector(".menu-toggle"),nav=document.querySelector(".main-nav");
 if(menu&&nav)menu.addEventListener("click",()=>nav.classList.toggle("open"));
 document.querySelectorAll(".bag-count").forEach(el=>el.textContent="—");
 // The demo deliberately has no live cart, order submission or payment processing.
 if(page==="home"){
   const target=document.getElementById("featured-products");
   if(target)target.innerHTML=PRODUCTS.slice(0,4).map(p=>productCard({...p,imageSrc:p.image})).join("");
 }
 if(page==="shop"){
   const target=document.getElementById("all-products"),count=document.getElementById("result-count");
   const buttons=[...document.querySelectorAll(".filter-btn")];
   const params=new URLSearchParams(location.search);let active=params.get("category")||"All";
   function render(){buttons.forEach(b=>b.classList.toggle("active",b.dataset.filter===active));const list=active==="All"?PRODUCTS:PRODUCTS.filter(p=>p.category===active);target.innerHTML=list.map(p=>productCard(p)).join("");count.textContent=`${list.length} PIECES TO LOVE`;}
   buttons.forEach(b=>b.addEventListener("click",()=>{active=b.dataset.filter;render();}));render();
 }
 if(page==="product"){
   const id=new URLSearchParams(location.search).get("id")||"p1";const p=PRODUCTS.find(x=>x.id===id)||PRODUCTS[0];
   document.title=p.name+" | FLOAURA";
   document.getElementById("product-detail").innerHTML=`<div class="detail-image"><img src="../${p.image}" alt="${p.name}"></div><div class="detail-copy"><p class="product-category">${p.category} / FLOAURA SIGNATURE</p><h1>${p.name}</h1><p class="detail-price">${money(p.price)}</p><p class="detail-description">${p.description}</p><div class="detail-note">♡ Thoughtfully arranged · Delivery across Pune · Personalisation available</div><p class="eyebrow">MAKE IT YOURS</p><p class="detail-description">Add a personal message and choose your preferred delivery date when online ordering launches.</p><div class="detail-actions"><button class="btn btn-dark" id="preview-add">Add to bag <span>↗</span></button><a class="btn btn-outline" href="shop.html">Continue exploring</a></div><p class="form-footnote">Interactive ordering is not enabled in this concept preview.</p></div>`;
   document.getElementById("preview-add").addEventListener("click",()=>alert("This is a design preview. Online ordering will be enabled after the website launch."));
   document.getElementById("related-products").innerHTML=PRODUCTS.filter(x=>x.id!==p.id).slice(0,4).map(x=>productCard({...x,image:x.image})).join("");
 }
 if(page==="cart"){
   document.getElementById("cart-content").innerHTML=`<div class="empty-cart"><p class="eyebrow">A LITTLE SPACE FOR SOMETHING LOVELY</p><h2>Your bag is waiting to be filled.</h2><p>Discover flowers and thoughtful gifts made for your favourite people.</p><a class="btn btn-dark" href="shop.html">Explore gifts ↗</a></div>`;
 }
 if(page==="checkout"){
   const chosen=PRODUCTS.slice(0,2),total=chosen.reduce((s,p)=>s+p.price,0);
   document.getElementById("checkout-summary").innerHTML=chosen.map(p=>`<div class="summary-item"><img src="../${p.image}" alt="${p.name}"><div><strong>${p.name}</strong><small>Qty: 1</small></div><b>${money(p.price)}</b></div>`).join("");
   document.getElementById("checkout-total").textContent=money(total);
   document.getElementById("demo-place-order").addEventListener("click",()=>alert("Thank you for exploring FLOAURA. This checkout is a visual preview only — no order or payment has been placed."));
 }
});