const defaults={
 weights:[["1 kg",700],["1.5 kg",950],["2 kg",1250],["2.5 kg",1500],["3 kg",1800],["3.5 kg",2050],["4 kg",2300]],
 flavours:[["Chocolate",0],["Vanilla",0],["Butterscotch",100],["Red Velvet",150],["Pineapple",50]],
 fillings:[["Classic Cream",0],["Chocolate Truffle",150],["Fresh Fruit",200],["Premium Filling",300]],
 types:[["Regular",0],["Eggless",100]]
};
let data=JSON.parse(localStorage.getItem("monginisSettings")||"null")||defaults;

const money=n=>"₹"+Number(n).toLocaleString("en-IN");
function populate(){
  weight.innerHTML=data.weights.map((x,i)=>`<option value="${i}">${x[0]} — ${money(x[1])}</option>`).join("");
  flavour.innerHTML=data.flavours.map((x,i)=>`<option value="${i}">${x[0]}${x[1]?` (+${money(x[1])})`:""}</option>`).join("");
  filling.innerHTML=data.fillings.map((x,i)=>`<option value="${i}">${x[0]}${x[1]?` (+${money(x[1])})`:""}</option>`).join("");
  cakeType.innerHTML=data.types.map((x,i)=>`<option value="${i}">${x[0]}${x[1]?` (+${money(x[1])})`:""}</option>`).join("");
  updatePrice();
}
function updatePrice(){
  const w=data.weights[+weight.value]||data.weights[0], f=data.flavours[+flavour.value]||data.flavours[0], fi=data.fillings[+filling.value]||data.fillings[0], t=data.types[+cakeType.value]||data.types[0];
  price.textContent=money(w[1]+f[1]+fi[1]+t[1]);
}
[weight,flavour,filling,cakeType].forEach(x=>x.addEventListener("change",updatePrice));
cakeImage.addEventListener("change",e=>{const file=e.target.files[0];if(!file)return;const r=new FileReader();r.onload=()=>{preview.src=r.result;uploadBox.classList.add("hasImage")};r.readAsDataURL(file)});
cakeForm.addEventListener("submit",e=>{
 e.preventDefault();
 const w=data.weights[+weight.value],f=data.flavours[+flavour.value],fi=data.fillings[+filling.value],t=data.types[+cakeType.value];
 const total=w[1]+f[1]+fi[1]+t[1], file=cakeImage.files[0];
 let msg=`🎂 *CUSTOM CAKE REQUEST – MONGINIS AUNDH*%0A%0A*Weight:* ${w[0]}%0A*Base price:* ${money(w[1])}%0A*Flavour:* ${f[0]}%0A*Filling:* ${fi[0]}%0A*Cake type:* ${t[0]}%0A*Message:* ${message.value||"None"}%0A*Notes:* ${notes.value||"None"}%0A%0A*Estimated price: ${money(total)}*%0A`;
 if(file) msg+=`%0A📷 *Reference image selected:* ${file.name}%0A_(Please attach the image manually in WhatsApp after the message opens.)_`;
 msg+=`%0A%0APlease confirm the final price and design.`;
 window.open("https://wa.me/918888999942?text="+msg,"_blank");
});
function openSettings(){renderSettings();settingsModal.classList.add("show")}
function closeSettings(){settingsModal.classList.remove("show")}
function rows(arr,key){return arr.map((x,i)=>`<div class="settingRow"><input data-k="${key}" data-i="${i}" data-field="name" value="${x[0]}"><input data-k="${key}" data-i="${i}" data-field="price" type="number" min="0" value="${x[1]}"></div>`).join("")}
function renderSettings(){weightSettings.innerHTML=rows(data.weights,"weights");flavourSettings.innerHTML=rows(data.flavours,"flavours");fillingSettings.innerHTML=rows(data.fillings,"fillings");typeSettings.innerHTML=rows(data.types,"types")}
function saveSettings(){
 document.querySelectorAll(".settingRow input").forEach(el=>{const a=data[el.dataset.k][+el.dataset.i];if(el.dataset.field==="name")a[0]=el.value;else a[1]=Number(el.value)||0});
 localStorage.setItem("monginisSettings",JSON.stringify(data));populate();closeSettings();alert("Settings saved on this browser.");
}
populate();
