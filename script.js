// ===== Shop settings (change here only) =====
const WA = '8801757826005';
const T = {
 en:{brandSub:'Furniture & Home Decor',navProducts:'Furniture',navDecor:'Home Decor',navAbout:'About',navContact:'Contact',
  ownerLbl:'Owner',mapBtn:'Get Directions',heroH:'Furniture of Trust,<br>Built for a Lifetime.',heroP:'Quality beds, dining sets, almirahs, wardrobes and office furniture, plus beautiful home decor. Visit our showroom at Mokamtola, Bogura.',
  waBtn:'WhatsApp Us',callBtn:'Call 01724-553778',fbBtn:'Facebook Page',askBtn:'Ask on WhatsApp',ask:'Ask price',price:'Call for price',aiTag:'AI design preview',all:'All',
  s1t:'Good quality boards',s1d:'Vtex, MDF & Melamine',s2t:'Home delivery',s2d:'Mokamtola upazila',s3t:'See before you buy',s3d:'Full showroom, Talukder Market',s4t:'Simple payment',s4d:'Cash',
  pK:'Our Furniture',pH:'Made to live with',pS:'Tap any item to see it bigger. Price is shared on call or WhatsApp, because it depends on size and board type.',pMore:'We also have sofas, kids furniture and more in the showroom. Ask us on WhatsApp.',
  dK:'Home Decor',dH:'Little things that finish a room',dS:'Flower pots, plants, hanging baskets and wall pieces for your home.',
  rK:'Our Showroom',rH:'Come and see it in person',
  aK:'About Us',aH:'A local shop you can trust',aP1:'Talukder Furniture & Home Decor is a furniture showroom in Mokamtola, Bogura, run by MD. Zillul Bary. We sell good-quality furniture made from Vtex, MDF board and Melamine board, along with home decor for every room.',aP2:'Come to the shop, touch and compare before you buy. For customers in Mokamtola upazila, we offer home delivery.',aO:'Owner',
  cK:'Contact & Visit',cH:'We are easy to find',cAddr:'Address',cAddrV:'Talukder Market, Joypurrastar Mor, east side of the overbridge, Mokamtola, Bogura',cMap:'Open in Google Maps',cHrs:'Opening hours',cSat:'Saturday to Thursday',cFri:'Friday',cReach:'Talk to us',cCall:'Call',cFb:'Our page',cPay:'Payment: cash.',fTag:'Furniture of Trust, Built for a Lifetime',
  open:'Open now · closes 9 PM',closed:'Closed now · see hours below',
  fc:{bed:'Beds',dining:'Dining',wardrobe:'Wardrobes & Almirah',showcase:'Showcase',office:'Office & Study',other:'Tables & Storage'},
  dc:{flower:'Flowers',plant:'Plants',hang:'Hanging',wall:'Wall & Mirrors'},
  msg:n=>`Assalamu alaikum, I want to know the price of: ${n} (Talukder Furniture website)`,msgG:'Assalamu alaikum, I want to know about your furniture (Talukder Furniture website)'},
 bn:{brandSub:'ফার্নিচার ও হোম ডেকর',navProducts:'ফার্নিচার',navDecor:'হোম ডেকর',navAbout:'আমাদের কথা',navContact:'যোগাযোগ',
  ownerLbl:'স্বত্বাধিকারী',mapBtn:'ম্যাপে দেখুন',heroH:'বিশ্বাসের ফার্নিচার,<br>আজীবনের জন্য তৈরি।',heroP:'মানসম্মত খাট, ডাইনিং সেট, আলমারি, ওয়ার্ডরোব ও অফিস ফার্নিচার, সাথে সুন্দর হোম ডেকর। আমাদের শোরুমে আসুন, মোকামতলা, বগুড়া।',
  waBtn:'হোয়াটসঅ্যাপ করুন',callBtn:'কল করুন 01724-553778',fbBtn:'ফেসবুক পেজ',askBtn:'হোয়াটসঅ্যাপে জিজ্ঞেস করুন',ask:'দাম জানুন',price:'দামের জন্য কল করুন',aiTag:'এআই ডিজাইন প্রিভিউ',all:'সব',
  s1t:'ভালো মানের বোর্ড',s1d:'ভিটেক্স, এমডিএফ ও মেলামাইন',s2t:'হোম ডেলিভারি',s2d:'মোকামতলা উপজেলায়',s3t:'দেখে কিনুন',s3d:'পুরো শোরুম, তালুকদার মার্কেট',s4t:'সহজ পেমেন্ট',s4d:'নগদ টাকা',
  pK:'আমাদের ফার্নিচার',pH:'ঘরের জন্য, জীবনের জন্য',pS:'ছবিতে ট্যাপ করে বড় করে দেখুন। সাইজ ও বোর্ড অনুযায়ী দাম ভিন্ন হয়, তাই কল বা হোয়াটসঅ্যাপে দাম জানিয়ে দেওয়া হয়।',pMore:'শোরুমে সোফা, বাচ্চাদের ফার্নিচারসহ আরও অনেক কিছু আছে। হোয়াটসঅ্যাপে জিজ্ঞেস করুন।',
  dK:'হোম ডেকর',dH:'ছোট ছোট জিনিসেই ঘর সুন্দর',dS:'ফুলের টব, গাছ, ঝুলন্ত বাস্কেট ও দেয়ালের সাজসজ্জা।',
  rK:'আমাদের শোরুম',rH:'সরাসরি এসে দেখে যান',
  aK:'আমাদের কথা',aH:'আপনার বিশ্বস্ত স্থানীয় দোকান',aP1:'তালুকদার ফার্নিচার অ্যান্ড হোম ডেকর মোকামতলা, বগুড়ার একটি ফার্নিচার শোরুম, পরিচালনায় মোঃ জিল্লুল বারী। আমরা ভিটেক্স, এমডিএফ বোর্ড ও মেলামাইন বোর্ডের ভালো মানের ফার্নিচার এবং সব ঘরের জন্য হোম ডেকর বিক্রি করি।',aP2:'দোকানে এসে নিজে দেখে, তুলনা করে কিনুন। মোকামতলা উপজেলার গ্রাহকদের জন্য হোম ডেলিভারি আছে।',aO:'স্বত্বাধিকারী',
  cK:'যোগাযোগ ও ঠিকানা',cH:'আমাদের খুঁজে পাওয়া সহজ',cAddr:'ঠিকানা',cAddrV:'তালুকদার মার্কেট, জয়পুররাস্তার মোড়, ওভারব্রিজের পূর্ব পাশে, মোকামতলা, বগুড়া',cMap:'গুগল ম্যাপে দেখুন',cHrs:'খোলার সময়',cSat:'শনিবার থেকে বৃহস্পতিবার',cFri:'শুক্রবার',cReach:'কথা বলুন',cCall:'কল',cFb:'আমাদের পেজ',cPay:'পেমেন্ট: নগদ টাকা।',fTag:'বিশ্বাসের ফার্নিচার, আজীবনের জন্য তৈরি',
  open:'এখন খোলা · রাত ৯টায় বন্ধ',closed:'এখন বন্ধ · সময় নিচে দেখুন',
  fc:{bed:'খাট',dining:'ডাইনিং',wardrobe:'ওয়ার্ডরোব ও আলমারি',showcase:'শোকেস',office:'অফিস ও স্টাডি',other:'টেবিল ও স্টোরেজ'},
  dc:{flower:'ফুল',plant:'গাছ',hang:'ঝুলন্ত',wall:'দেয়াল ও আয়না'},
  msg:n=>`আসসালামু আলাইকুম, আমি এই পণ্যের দাম জানতে চাই: ${n} (তালুকদার ফার্নিচার ওয়েবসাইট)`,msgG:'আসসালামু আলাইকুম, আমি আপনাদের ফার্নিচার সম্পর্কে জানতে চাই (তালুকদার ফার্নিচার ওয়েবসাইট)'}
};

// ===== Products come from the "products" folder (no coding needed) =====
// Put photos in:  products/furniture/<category>/   or   products/decor/<category>/
// File name = product name.  "English name__বাংলা নাম.jpg"  (Bangla part is optional)
// Add [AI] in the file name to show the "AI design preview" tag.
// See HOW-TO-ADD-PRODUCTS.txt
const GH = { owner: 'Sifat049', repo: 'talukder-furniture' }; // GitHub repo that hosts the site
const ORDER = ['bed','dining','wardrobe','showcase','office','sofa','kids','other','flower','plant','hanging','wall'];
const EXTRA = { // nice labels for common folder names (others show the folder name as is)
 en:{sofa:'Sofa',kids:'Kids Furniture',dressing:'Dressing Table',table:'Tables',chair:'Chairs',shelf:'Shelves',decor:'Decor'},
 bn:{sofa:'সোফা',kids:'বাচ্চাদের ফার্নিচার',dressing:'ড্রেসিং টেবিল',table:'টেবিল',chair:'চেয়ার',shelf:'শেলফ',decor:'ডেকর'}
};
let F = [], D = [];
const nice = s => s.replace(/_+/g,' ').replace(/\s+/g,' ').trim();
function parsePath(path){
  const m = path.match(/^products\/(furniture|decor)\/([^/]+)\/([^/]+)\.(jpe?g|png|webp|avif)$/i);
  if(!m) return null;
  const file = m[3], ai = /\[ai\]/i.test(file);
  const parts = file.replace(/\[ai\]/ig,'').replace(/^\d+[-_. ]+/,'').split('__').map(x=>x.trim()).filter(Boolean);
  let en = nice(parts[0]||'Product'); if(!/\s/.test(en)) en = en.replace(/-/g,' ');
  return { g:m[1], c:m[2].toLowerCase(), img:path, en, bn: nice(parts[1]||en), ai };
}
function setProducts(paths){
  const list = paths.map(parsePath).filter(Boolean);
  const rank = c => { const i = ORDER.indexOf(c); return i<0 ? 50 : i; };
  list.sort((x,y)=> rank(x.c)-rank(y.c) || x.c.localeCompare(y.c) || x.en.localeCompare(y.en));
  F = list.filter(p=>p.g==='furniture'); D = list.filter(p=>p.g==='decor');
}
const catLabel = (c,map) => (map && map[c]) || (EXTRA[lang] && EXTRA[lang][c]) || (c.charAt(0).toUpperCase()+c.slice(1)).replace(/[-_]+/g,' ');
// On the live site (GitHub Pages) read the folder list straight from GitHub, so new photos appear automatically.
async function loadLive(){
  if(!/\.github\.io$/.test(location.hostname)) return;
  try{
    const c = JSON.parse(sessionStorage.getItem('tp')||'null');
    if(c && Date.now()-c.t < 300000){ setProducts(c.p); render(); return; }
  }catch(e){}
  try{
    const r = await fetch(`https://api.github.com/repos/${GH.owner}/${GH.repo}/git/trees/HEAD?recursive=1`);
    if(!r.ok) return;
    const j = await r.json();
    const paths = (j.tree||[]).filter(x=>x.type==='blob').map(x=>x.path);
    if(!paths.some(p=>parsePath(p))) return;
    try{ sessionStorage.setItem('tp', JSON.stringify({t:Date.now(),p:paths})); }catch(e){}
    setProducts(paths); render();
  }catch(e){ /* keep the built-in list */ }
}
setProducts(window.PRODUCTS_PATHS || []);

let lang = localStorage.getItem('lang')||'bn', fcat='all', dcat='all';
const $=s=>document.querySelector(s);
const wa=t=>`https://wa.me/${WA}?text=${encodeURIComponent(t)}`;

function chips(el,cats,map,cur,cb){
  el.innerHTML='';
  ['all',...cats].forEach(k=>{const b=document.createElement('button');b.className='chip'+(k===cur?' on':'');b.textContent=k==='all'?T[lang].all:catLabel(k,map);b.onclick=()=>cb(k);el.appendChild(b)});
}
function card(p,isF){
  const name=p[lang];
  const el=document.createElement('article');el.className='card-p';
  el.innerHTML=`<div class="ph"><img src="${encodeURI(p.img)}" alt="${name}" loading="lazy">${p.ai?`<span class="tag">${T[lang].aiTag}</span>`:''}</div>
  <div class="info"><h3>${name}</h3><div class="row2"><span class="price">${isF?T[lang].price:''}</span><a class="ask" target="_blank" rel="noopener" href="${wa(T[lang].msg(name))}">${T[lang].ask}</a></div></div>`;
  el.querySelector('.ph').onclick=()=>openLb(p);
  return el;
}
function render(){
  const t=T[lang];
  document.documentElement.lang=lang==='bn'?'bn':'en';
  document.body.classList.toggle('bn',lang==='bn');
  document.querySelectorAll('[data-i18n]').forEach(e=>{e.innerHTML=t[e.dataset.i18n]});
  $('#lang').textContent=lang==='bn'?'English':'বাংলা';
  const fcats=[...new Set(F.map(p=>p.c))], dcats=[...new Set(D.map(p=>p.c))];
  if(fcat!=='all'&&!fcats.includes(fcat))fcat='all'; if(dcat!=='all'&&!dcats.includes(dcat))dcat='all';
  chips($('#fchips'),fcats,t.fc,fcat,k=>{fcat=k;render()});
  chips($('#dchips'),dcats,t.dc,dcat,k=>{dcat=k;render()});
  const fg=$('#fgrid');fg.innerHTML='';F.filter(p=>fcat==='all'||p.c===fcat).forEach(p=>fg.appendChild(card(p,true)));
  const dg=$('#dgrid');dg.innerHTML='';D.filter(p=>dcat==='all'||p.c===dcat).forEach(p=>dg.appendChild(card(p,false)));
  const g=wa(t.msgG);['#heroWa','#waRow','#floatWa'].forEach(s=>$(s).href=g);
  openStatus();
}
function openLb(p){
  $('#lbimg').src=encodeURI(p.img);$('#lbt').textContent=p[lang];$('#lbwa').href=wa(T[lang].msg(p[lang]));
  $('#lb').hidden=false;document.body.style.overflow='hidden';
}
function closeLb(){$('#lb').hidden=true;document.body.style.overflow=''}
$('#lbx').onclick=closeLb;$('#lb').onclick=e=>{if(e.target.id==='lb')closeLb()};
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLb()});

// Open/closed badge in Bangladesh time (Fri 3-9pm, other days 10am-9pm)
function openStatus(){
  const n=new Date(new Date().toLocaleString('en-US',{timeZone:'Asia/Dhaka'}));
  const h=n.getHours()+n.getMinutes()/60, fri=n.getDay()===5;
  const on=h>=(fri?15:10)&&h<21;
  $('#openDot').className='dot'+(on?' on':'');
  $('#openTxt').textContent=on?T[lang].open:T[lang].closed;
}
$('#lang').onclick=()=>{lang=lang==='bn'?'en':'bn';try{localStorage.setItem('lang',lang)}catch(e){}render()};
$('#burger').onclick=()=>{$('#links').classList.toggle('open');$('#nav').classList.toggle('menu')};
document.querySelectorAll('#links a').forEach(a=>a.onclick=()=>{$('#links').classList.remove('open');$('#nav').classList.remove('menu')});
addEventListener('scroll',()=>$('#nav').classList.toggle('solid',scrollY>40),{passive:true});
$('#yr').textContent=new Date().getFullYear();
render();
loadLive();

// ===== Apple-style motion: hover tilt for hero cards + scroll reveal =====
(function(){
  const stage=document.getElementById('stage');
  if(stage && matchMedia('(hover:hover)').matches){
    const hero=document.getElementById('top');
    hero.addEventListener('mousemove',e=>{
      const r=hero.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
      stage.style.setProperty('--ry',(x*14)+'deg');
      stage.style.setProperty('--rx',(-y*10)+'deg');
    });
    hero.addEventListener('mouseleave',()=>{stage.style.setProperty('--rx','0deg');stage.style.setProperty('--ry','0deg')});
  }
  if(!('IntersectionObserver' in window)) return;
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.08,rootMargin:'0px 0px -40px 0px'});
  function scan(){document.querySelectorAll('.head,.card-p,.card,.gallery img,.about>*,.strip div').forEach(el=>{if(!el.classList.contains('rv')){el.classList.add('rv');io.observe(el)}})}
  scan();
  new MutationObserver(scan).observe(document.body,{childList:true,subtree:true});
})();
