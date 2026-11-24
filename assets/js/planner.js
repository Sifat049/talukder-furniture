/* Room Planner — a simple 2D top-down layout tool (units: feet).
   The items are GENERIC footprints so customers can check whether furniture fits. They are not exact product sizes. */
(function () {
'use strict';
const TF = window.TF, S = window.SHOP, $ = (s, r = document) => r.querySelector(s);
const KINDS = [
  { k: 'bed', en: 'Double Bed', bn: 'ডাবল খাট', w: 5.5, h: 6.5, c: '#c9a878' },
  { k: 'bedside', en: 'Bedside Table', bn: 'বেডসাইড টেবিল', w: 1.5, h: 1.3, c: '#9a7a55' },
  { k: 'wardrobe', en: 'Wardrobe (3-door)', bn: 'ওয়ার্ডরোব (৩ দরজা)', w: 4.5, h: 2, c: '#7a5a3c' },
  { k: 'almirah', en: 'Almirah', bn: 'আলমারি', w: 3, h: 1.8, c: '#6e4f35' },
  { k: 'sofa3', en: 'Sofa (3-seater)', bn: 'সোফা (৩ সিটার)', w: 7, h: 3, c: '#b8a98f' },
  { k: 'sofa1', en: 'Armchair', bn: 'আর্মচেয়ার', w: 2.8, h: 2.8, c: '#b8a98f' },
  { k: 'ctable', en: 'Centre Table', bn: 'সেন্টার টেবিল', w: 3.5, h: 2, c: '#a37a50' },
  { k: 'dining6', en: 'Dining Table (6 seats)', bn: 'ডাইনিং টেবিল (৬ সিট)', w: 6, h: 3.3, c: '#b99266' },
  { k: 'dchair', en: 'Dining Chair', bn: 'ডাইনিং চেয়ার', w: 1.5, h: 1.5, c: '#8a6a48' },
  { k: 'desk', en: 'Study / Office Table', bn: 'স্টাডি / অফিস টেবিল', w: 4, h: 2, c: '#8b6544' },
  { k: 'ochair', en: 'Office Chair', bn: 'অফিস চেয়ার', w: 1.8, h: 1.8, c: '#555' },
  { k: 'showcase', en: 'Showcase', bn: 'শোকেস', w: 3.5, h: 1.3, c: '#7f5b3a' },
  { k: 'plant', en: 'Plant / Decor stand', bn: 'গাছ / ডেকর স্ট্যান্ড', w: 1.3, h: 1.3, c: '#6f9a5a' }
];
const lang = () => TF.lang(), nm = k => (lang() === 'bn' ? k.bn : k.en);
let st = { rw: 12, rh: 14, items: [], sel: null };
try { st = Object.assign(st, JSON.parse(localStorage.getItem('tfPlan') || '{}')); } catch (e) {}
const save = () => { try { localStorage.setItem('tfPlan', JSON.stringify({ rw: st.rw, rh: st.rh, items: st.items })); } catch (e) {} };
const svg = $('#plan'), PX = 40; /* 1 ft = 40 svg units */
let uid = Date.now();

function draw() {
  const W = st.rw * PX, H = st.rh * PX, m = 30;
  svg.setAttribute('viewBox', `${-m} ${-m} ${W + 2 * m} ${H + 2 * m}`);
  let g = `<defs><pattern id="gr" width="${PX}" height="${PX}" patternUnits="userSpaceOnUse"><path d="M${PX} 0H0V${PX}" fill="none" stroke="rgba(0,0,0,.08)" stroke-width="1"/></pattern></defs>
    <rect x="0" y="0" width="${W}" height="${H}" fill="#fbf8f3" stroke="#5b3a22" stroke-width="6"/><rect x="0" y="0" width="${W}" height="${H}" fill="url(#gr)"/>
    <text x="${W / 2}" y="-10" text-anchor="middle" font-size="15" fill="#7b7167">${st.rw} ft</text><text x="-12" y="${H / 2}" font-size="15" fill="#7b7167" text-anchor="middle" transform="rotate(-90 -12 ${H / 2})">${st.rh} ft</text>`;
  st.items.forEach(it => {
    const k = KINDS.find(x => x.k === it.k), w = it.w * PX, h = it.h * PX, sel = st.sel === it.id;
    g += `<g class="it" data-id="${it.id}" transform="translate(${it.x * PX} ${it.y * PX}) rotate(${it.r} ${w / 2} ${h / 2})" style="cursor:move">
      <rect width="${w}" height="${h}" rx="4" fill="${k.c}" fill-opacity=".92" stroke="${sel ? '#b8955a' : '#3f2616'}" stroke-width="${sel ? 4 : 1.5}"/>
      <text x="${w / 2}" y="${h / 2 + 4}" text-anchor="middle" font-size="${Math.min(13, w / 6)}" fill="#fff" pointer-events="none" style="paint-order:stroke;stroke:rgba(0,0,0,.4);stroke-width:2px" transform="rotate(${-it.r} ${w / 2} ${h / 2})">${nm(k)}</text></g>`;
  });
  svg.innerHTML = g;
  const it = st.items.find(i => i.id === st.sel);
  $('#selBox').style.display = it ? 'block' : 'none';
  if (it) { $('#iw').value = it.w; $('#ih').value = it.h; $('#selName').textContent = nm(KINDS.find(x => x.k === it.k)); }
  $('#rw').value = st.rw; $('#rh').value = st.rh;
  $('#count').textContent = st.items.length;
  save();
}
function pt(e) { const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); }
let drag = null;
svg.addEventListener('pointerdown', e => {
  const el = e.target.closest('.it'); if (!el) { st.sel = null; draw(); return; }
  st.sel = el.dataset.id; const it = st.items.find(i => i.id === st.sel), p = pt(e);
  drag = { id: it.id, dx: p.x / PX - it.x, dy: p.y / PX - it.y }; svg.setPointerCapture(e.pointerId); draw();
});
svg.addEventListener('pointermove', e => {
  if (!drag) return; const it = st.items.find(i => i.id === drag.id), p = pt(e);
  const bw = it.r % 180 ? it.h : it.w, bh = it.r % 180 ? it.w : it.h, cx = it.w / 2, cy = it.h / 2;
  let x = Math.round((p.x / PX - drag.dx) * 2) / 2, y = Math.round((p.y / PX - drag.dy) * 2) / 2;
  /* keep the (rotated) item inside the room */
  const ox = cx - bw / 2, oy = cy - bh / 2; x = Math.max(-ox, Math.min(st.rw - bw - ox, x)); y = Math.max(-oy, Math.min(st.rh - bh - oy, y));
  it.x = x; it.y = y; draw();
});
svg.addEventListener('pointerup', () => { drag = null; });
function add(k) { const kd = KINDS.find(x => x.k === k); const it = { id: 'i' + uid++, k, x: Math.max(0, (st.rw - kd.w) / 2), y: Math.max(0, (st.rh - kd.h) / 2), w: kd.w, h: kd.h, r: 0 }; st.items.push(it); st.sel = it.id; draw(); }
function palette() { $('#pal').innerHTML = KINDS.map(k => `<button class="pk" data-k="${k.k}"><i style="background:${k.c}"></i>${nm(k)}<small>${k.w}×${k.h} ft</small></button>`).join(''); document.querySelectorAll('.pk').forEach(b => b.onclick = () => add(b.dataset.k)); }
$('#rot').onclick = () => { const it = st.items.find(i => i.id === st.sel); if (it) { it.r = (it.r + 90) % 360; draw(); } };
$('#dup').onclick = () => { const it = st.items.find(i => i.id === st.sel); if (it) { const c = { ...it, id: 'i' + uid++, x: it.x + 1, y: it.y + 1 }; st.items.push(c); st.sel = c.id; draw(); } };
$('#del').onclick = () => { st.items = st.items.filter(i => i.id !== st.sel); st.sel = null; draw(); };
$('#clr').onclick = () => { st.items = []; st.sel = null; draw(); };
['iw', 'ih'].forEach(id => $('#' + id).oninput = () => { const it = st.items.find(i => i.id === st.sel); if (it) { it.w = Math.max(0.5, +$('#iw').value || 1); it.h = Math.max(0.5, +$('#ih').value || 1); draw(); } });
['rw', 'rh'].forEach(id => $('#' + id).onchange = () => { st.rw = Math.min(40, Math.max(4, +$('#rw').value || 12)); st.rh = Math.min(40, Math.max(4, +$('#rh').value || 14)); draw(); });
document.addEventListener('keydown', e => { if ((e.key === 'Delete' || e.key === 'Backspace') && st.sel && !/INPUT/.test(document.activeElement.tagName)) { e.preventDefault(); $('#del').click(); } if (e.key === 'r' && st.sel && !/INPUT/.test(document.activeElement.tagName)) $('#rot').click(); });
$('#send').onclick = e => {
  const lines = st.items.map((i, n) => `${n + 1}. ${KINDS.find(k => k.k === i.k).en} ${i.w}x${i.h} ft`).join('\n');
  const msg = `Assalamu alaikum, I planned a room on the Talukder Furniture website.\nRoom: ${st.rw} ft x ${st.rh} ft\n${lines || '(no items yet)'}\nPlease help me choose furniture that fits.`;
  e.currentTarget.href = TF.wa(msg);
};
$('#png').onclick = () => {
  const x = new XMLSerializer().serializeToString(svg), img = new Image();
  img.onload = () => { const c = document.createElement('canvas'); c.width = img.width * 2; c.height = img.height * 2; const g = c.getContext('2d'); g.fillStyle = '#fff'; g.fillRect(0, 0, c.width, c.height); g.drawImage(img, 0, 0, c.width, c.height); const a = document.createElement('a'); a.download = 'room-plan.png'; a.href = c.toDataURL('image/png'); a.click(); };
  const vb = svg.viewBox.baseVal; img.width = vb.width; img.height = vb.height;
  img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(x.replace('<svg', `<svg xmlns="http://www.w3.org/2000/svg" width="${vb.width}" height="${vb.height}"`));
};
palette(); draw();
document.addEventListener('tf:render', () => { palette(); draw(); });
})();
