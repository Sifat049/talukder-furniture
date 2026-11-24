/* Virtual Showroom — illustrative 3D rooms.
   The furniture shapes in these rooms are generic. The framed photographs and the product list are your REAL products,
   read from assets/js/data/catalog.js. If a product has a "model" (.glb) in the catalog, that model is placed in the room too. */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const TF = window.TF, L = TF.L, t = TF.t;
const stage = document.getElementById('stage');
const tip = document.getElementById('tip');
const load = document.getElementById('vsLoad');

const ROOMS = [
  { id: 'bedroom', en: 'Bedroom', bn: 'বেডরুম', cats: ['beds', 'storage', 'wardrobes'], wall: 0xeadbc4, floor: 0x9a6a40 },
  { id: 'living', en: 'Drawing Room', bn: 'ড্রয়িং রুম', cats: ['sofas', 'showcases', 'tables'], wall: 0xe6dccb, floor: 0x8d6240 },
  { id: 'dining', en: 'Dining Room', bn: 'ডাইনিং রুম', cats: ['dining', 'chairs'], wall: 0xefe4d2, floor: 0x93663f },
  { id: 'office', en: 'Office', bn: 'অফিস', cats: ['office'], wall: 0xe3dccf, floor: 0x7d5a3c },
  { id: 'decor', en: 'Home Decor Gallery', bn: 'হোম ডেকর গ্যালারি', group: 'decor', wall: 0xede3d1, floor: 0xa27649 }
];
const SPACING = 11, RW = 8, RD = 6, RH = 3.1;
/* 360° photo rings: ALL real product photos on a turntable ring that turns around you */
/* 360° photo rings: ALL real product photos on a turntable ring that turns around you */
const RINGS = [
  { id: 'ringF', en: 'Furniture 360°', bn: 'ফার্নিচার ঘুরিয়ে দেখুন', group: 'furniture', pw: 2.0, ph: 2.5, pitch: 3.4, cx: 100 },
  { id: 'ringD', en: 'Decor 360°', bn: 'ডেকর ঘুরিয়ে দেখুন', group: 'decor', pw: 1.3, ph: 1.7, pitch: 1.95, cx: 160 }
];

const ALL = ROOMS.concat(RINGS);
const rings = [];

/* ---------- renderer ---------- */
let renderer;
try {
  renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
} catch (e) {
  stage.innerHTML = `<div class="vs-fallback"><h3>3D is not supported on this device</h3><p>You can still browse our real products.</p><a class="btn dark" href="furniture.html">${t('furniture')}</a></div>`;
  if (load) load.remove();
  throw e;
}
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
renderer.outputColorSpace = THREE.SRGBColorSpace;
stage.appendChild(renderer.domElement);
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1c1511); scene.fog = new THREE.Fog(0x1c1511, 24, 70);
const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 120);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; controls.dampingFactor = 0.08; controls.maxPolarAngle = Math.PI * 0.49; controls.minDistance = 1.5; controls.maxDistance = 8; controls.enablePan = true;
scene.add(new THREE.HemisphereLight(0xfff1dc, 0x4a3524, 0.5));
const pmrem = new THREE.PMREMGenerator(renderer); scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture; scene.environmentIntensity = 0.55;

/* ---------- materials & helpers ---------- */
function woodTexture(base, dark) {
  const c = document.createElement('canvas'); c.width = c.height = 512; const g = c.getContext('2d');
  g.fillStyle = base; g.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 520; i++) { g.strokeStyle = dark; g.globalAlpha = Math.random() * 0.16; g.lineWidth = Math.random() * 2 + 0.3; const y = Math.random() * 512; g.beginPath(); g.moveTo(0, y); g.bezierCurveTo(170, y + Math.random() * 6 - 3, 340, y + Math.random() * 6 - 3, 512, y + Math.random() * 4 - 2); g.stroke(); }
  g.globalAlpha = 0.22; g.strokeStyle = '#2b190d'; g.lineWidth = 2; for (let i = 1; i < 6; i++) { g.beginPath(); g.moveTo(0, i * 85); g.lineTo(512, i * 85); g.stroke(); }
  const tx = new THREE.CanvasTexture(c); tx.wrapS = tx.wrapT = THREE.RepeatWrapping; tx.colorSpace = THREE.SRGBColorSpace; tx.anisotropy = 4; return tx;
}
const M = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.65, metalness: 0, ...o });
const woodDark = M(0x4a2c1a, { roughness: 0.42, map: woodTexture('#5a3a24', '#2a170c') });
const woodRich = M(0xd8b8a0, { roughness: 0.38, metalness: 0.02, map: woodTexture('#8a5230', '#3b200f') });
const woodMid = M(0x8a5a36, { roughness: 0.5, map: woodTexture('#a06b40', '#4c2c15') });
const woodLight = M(0xc09060, { roughness: 0.55, map: woodTexture('#c8996a', '#6a4424') });
const fabric = M(0xcdbfa6, { roughness: 0.95 }), fabricDk = M(0x6d6256, { roughness: 0.95 }), white = M(0xf4efe6, { roughness: 0.9 });
const glass = M(0xcfe6ee, { roughness: 0.05, metalness: 0.1, transparent: true, opacity: 0.28 });
const gold = M(0xb8955a, { roughness: 0.3, metalness: 0.8 }), steel = M(0xaaaaaa, { roughness: 0.3, metalness: 0.9 });
const leaf = M(0x3f7a3f, { roughness: 0.8 }), leaf2 = M(0x5f9a4f, { roughness: 0.8 });
function add(p, geo, mat, x, y, z, o = {}) { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); if (o.r) m.rotation.set(...o.r); m.castShadow = o.cs !== false; m.receiveShadow = true; p.add(m); return m; }
function box(p, w, h, d, mat, x, y, z) { return add(p, new THREE.BoxGeometry(w, h, d), mat, x, y + h / 2, z); }
function cyl(p, rt, rb, h, mat, x, y, z, seg = 24) { return add(p, new THREE.CylinderGeometry(rt, rb, h, seg), mat, x, y + h / 2, z); }
function ball(p, r, mat, x, y, z, sy = 1) { const m = add(p, new THREE.SphereGeometry(r, 20, 14), mat, x, y, z); m.scale.y = sy; return m; }

/* ---------- furniture (generic shapes) ---------- */
function bed(p, x, z) {
  const g = new THREE.Group(); g.position.set(x, 0, z); p.add(g);
  box(g, 1.75, 0.28, 2.15, woodMid, 0, 0.12, 0); box(g, 1.62, 0.24, 2.0, white, 0, 0.4, 0.02);
  box(g, 1.7, 0.1, 1.0, M(0xb8955a, { roughness: 0.9 }), 0, 0.62, 0.5);
  box(g, 1.85, 1.2, 0.1, woodRich, 0, 0.1, -1.12); box(g, 1.7, 0.7, 0.04, M(0x7a4e2e, { map: woodMid.map }), 0, 0.45, -1.05);
  box(g, 0.62, 0.14, 0.38, white, -0.42, 0.64, -0.78); box(g, 0.62, 0.14, 0.38, white, 0.42, 0.64, -0.78);
  box(g, 1.85, 0.34, 0.08, woodDark, 0, 0.1, 1.1);
}
function bedside(p, x, z) { const g = new THREE.Group(); g.position.set(x, 0, z); p.add(g); box(g, 0.5, 0.55, 0.42, woodRich, 0, 0, 0); box(g, 0.4, 0.015, 0.01, gold, 0, 0.36, 0.215); box(g, 0.4, 0.015, 0.01, gold, 0, 0.18, 0.215); }
function wardrobe(p, x, z, ry, w = 1.5) {
  const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = ry; p.add(g);
  box(g, w, 2.2, 0.6, woodRich, 0, 0, 0); for (let i = 1; i < 3; i++) box(g, 0.012, 2.05, 0.01, M(0x1d0f07), -w / 2 + i * w / 3, 0.07, 0.305);
  for (let i = 0; i < 3; i++) box(g, 0.02, 0.22, 0.02, gold, -w / 2 + (i + 1) * w / 3 - 0.07, 1.05, 0.32);
}
function sofa(p, x, z, ry, w = 2.2) {
  const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = ry; p.add(g);
  box(g, w, 0.28, 0.92, woodDark, 0, 0.08, 0); box(g, w - 0.4, 0.22, 0.8, fabric, 0, 0.36, 0.05); box(g, w, 0.55, 0.24, fabric, 0, 0.4, -0.38);
  box(g, 0.22, 0.52, 0.92, fabric, -w / 2 + 0.11, 0.28, 0); box(g, 0.22, 0.52, 0.92, fabric, w / 2 - 0.11, 0.28, 0);
  box(g, 0.45, 0.4, 0.14, fabricDk, -w / 4, 0.55, -0.2); box(g, 0.45, 0.4, 0.14, fabricDk, w / 4, 0.55, -0.2);
}
function armchair(p, x, z, ry) { sofa(p, x, z, ry, 0.95); }
function table(p, x, z, w, d, top = woodMid, h = 0.74) {
  const g = new THREE.Group(); g.position.set(x, 0, z); p.add(g);
  box(g, w, 0.06, d, top, 0, h - 0.06, 0);
  [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([a, b]) => box(g, 0.07, h - 0.06, 0.07, woodDark, a * (w / 2 - 0.1), 0, b * (d / 2 - 0.1)));
  return g;
}
function chair(p, x, z, ry) {
  const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = ry; p.add(g);
  box(g, 0.44, 0.05, 0.44, fabricDk, 0, 0.44, 0); box(g, 0.44, 0.5, 0.05, woodDark, 0, 0.5, -0.2);
  [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([a, b]) => box(g, 0.04, 0.44, 0.04, woodDark, a * 0.2, 0, b * 0.2));
}
function officeChair(p, x, z, ry) {
  const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = ry; p.add(g);
  cyl(g, 0.03, 0.03, 0.4, steel, 0, 0.05, 0); cyl(g, 0.28, 0.28, 0.03, steel, 0, 0.02, 0, 5);
  box(g, 0.5, 0.1, 0.5, M(0x1c1c1c, { roughness: 0.7 }), 0, 0.44, 0); box(g, 0.48, 0.6, 0.08, M(0x1c1c1c, { roughness: 0.7 }), 0, 0.55, -0.24);
}
function showcase(p, x, z, ry, w = 1.2) {
  const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = ry; p.add(g);
  box(g, w, 0.5, 0.45, woodRich, 0, 0, 0); box(g, w, 1.5, 0.42, woodRich, 0, 0.5, 0);
  for (let i = 0; i < 4; i++) box(g, w - 0.1, 0.02, 0.36, woodMid, 0, 0.7 + i * 0.35, 0.02);
  box(g, w - 0.06, 1.4, 0.015, glass, 0, 0.55, 0.22); box(g, w, 0.08, 0.5, woodRich, 0, 2.0, 0);
}
function desk(p, x, z) {
  const g = new THREE.Group(); g.position.set(x, 0, z); p.add(g);
  box(g, 1.4, 0.05, 0.7, woodRich, 0, 0.72, 0); box(g, 0.45, 0.72, 0.64, woodRich, 0.45, 0, 0); box(g, 0.05, 0.72, 0.6, woodRich, -0.65, 0, 0);
  box(g, 1.4, 0.9, 0.3, woodRich, 0, 0.77, -0.2); box(g, 1.25, 0.02, 0.28, woodMid, 0, 1.12, -0.19); box(g, 1.25, 0.02, 0.28, woodMid, 0, 1.4, -0.19);
  box(g, 0.45, 0.3, 0.02, M(0x111111, { roughness: 0.2 }), -0.2, 0.77, 0.05);
}
function bookshelf(p, x, z, ry, w = 1.2) {
  const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = ry; p.add(g);
  box(g, w, 2.0, 0.35, woodMid, 0, 0, 0);
  for (let i = 0; i < 4; i++) { box(g, w - 0.08, 0.02, 0.3, woodLight, 0, 0.35 + i * 0.45, 0.03); for (let j = 0; j < 5; j++) box(g, 0.06, 0.28, 0.2, M([0x7a2e2e, 0x2e4a7a, 0x3f6a3f, 0x8a6a2e, 0x555][j]), -w / 2 + 0.14 + j * 0.2, 0.37 + i * 0.45, 0.04); }
}
function rug(p, x, z, w, d, c) { box(p, w, 0.015, d, M(c, { roughness: 1 }), x, 0.005, z); }
function pendant(p, x, z, y, lightObj) {
  cyl(p, 0.01, 0.01, 1.0, steel, x, y, z, 6); const s = add(p, new THREE.CylinderGeometry(0.18, 0.4, 0.28, 24, 1, true), M(0xf5e6c8, { side: THREE.DoubleSide, emissive: 0xffd9a0, emissiveIntensity: 0.9 }), x, y, z, { cs: false });
  return s;
}
/* decor */
function pot(p, x, y, z, col, h = 0.22, r = 0.1) { cyl(p, r, r * 0.8, h, M(col, { roughness: 0.5 }), x, y, z); return y + h; }
function plant(p, x, y, z, s = 1, flowerCol) {
  const top = pot(p, x, y, z, 0xf1ece2, 0.2 * s, 0.1 * s);
  for (let i = 0; i < 7; i++) { const a = i / 7 * Math.PI * 2; add(p, new THREE.ConeGeometry(0.04 * s, 0.34 * s, 6), i % 2 ? leaf : leaf2, x + Math.cos(a) * 0.06 * s, top + 0.15 * s, z + Math.sin(a) * 0.06 * s, { r: [Math.sin(a) * 0.5, 0, -Math.cos(a) * 0.5] }); }
  if (flowerCol) for (let i = 0; i < 5; i++) { const a = i * 1.3; ball(p, 0.045 * s, M(flowerCol, { roughness: 0.6 }), x + Math.cos(a) * 0.09 * s, top + (0.28 + (i % 3) * 0.05) * s, z + Math.sin(a) * 0.09 * s); }
}
function vase(p, x, y, z, col, s = 1) {
  const pts = [[0.001, 0], [0.07, 0], [0.1, 0.1], [0.07, 0.22], [0.04, 0.3], [0.05, 0.34]].map(a => new THREE.Vector2(a[0] * s, a[1] * s));
  add(p, new THREE.LatheGeometry(pts, 24), M(col, { roughness: 0.25, metalness: 0.05 }), x, y, z);
  for (let i = 0; i < 3; i++) { add(p, new THREE.CylinderGeometry(0.004, 0.004, 0.3 * s, 4), leaf, x + (i - 1) * 0.02, y + 0.46 * s, z, { r: [0, 0, (i - 1) * 0.25] }); ball(p, 0.04 * s, M([0xd6568a, 0xf3c44f, 0xe8e0f5][i]), x + (i - 1) * 0.075 * s, y + 0.62 * s, z); }
}
function hangingBasket(p, x, y, z) {
  add(p, new THREE.SphereGeometry(0.17, 18, 12, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), M(0x8a5a36, { side: THREE.DoubleSide }), x, y, z);
  for (let i = 0; i < 3; i++) { const a = i * 2.1; add(p, new THREE.CylinderGeometry(0.005, 0.005, 1.25, 4), M(0xb04a3a), x + Math.cos(a) * 0.05, y + 0.62, z + Math.sin(a) * 0.05, { r: [Math.sin(a) * 0.1, 0, -Math.cos(a) * 0.1], cs: false }); }
  ball(p, 0.15, leaf2, x, y + 0.05, z, 0.5);
  for (let i = 0; i < 6; i++) { const a = i * 1.05; cyl(p, 0.012, 0.012, 0.4 + (i % 3) * 0.12, leaf, x + Math.cos(a) * 0.15, y - 0.4 - (i % 3) * 0.12, z + Math.sin(a) * 0.15, 5); }
}
function wallMirror(p, x, y, z, ry) { const g = new THREE.Group(); g.position.set(x, y, z); g.rotation.y = ry; p.add(g); add(g, new THREE.CylinderGeometry(0.3, 0.3, 0.04, 32), M(0xe9dcc2, { roughness: 0.9 }), 0, 0, 0, { r: [Math.PI / 2, 0, 0] }); add(g, new THREE.CylinderGeometry(0.24, 0.24, 0.045, 32), M(0xdfe9ee, { roughness: 0.04, metalness: 0.95 }), 0, 0, 0.003, { r: [Math.PI / 2, 0, 0] }); }
function shelfUnit(p, x, z, w, h) {
  const g = new THREE.Group(); g.position.set(x, 0, z); p.add(g);
  box(g, 0.04, h, 0.36, woodMid, -w / 2, 0, 0); box(g, 0.04, h, 0.36, woodMid, w / 2, 0, 0);
  for (let i = 0; i <= 4; i++) box(g, w, 0.035, 0.36, woodLight, 0, 0.1 + i * (h - 0.15) / 4, 0);
  return g;
}

/* ---------- rooms ---------- */
const frames = [], loader = new THREE.TextureLoader(), gltf = new GLTFLoader(), rooms = [];
function roomShell(cfg, i) {
  const g = new THREE.Group(); g.position.set(i * SPACING, 0, 0); scene.add(g);
  const ft = woodTexture('#' + new THREE.Color(cfg.floor).getHexString(), '#2a170c'); ft.repeat.set(4, 3);
  const floor = add(g, new THREE.PlaneGeometry(RW, RD), M(0xffffff, { map: ft, roughness: 0.4 }), 0, 0, 0, { r: [-Math.PI / 2, 0, 0], cs: false });
  const wallM = M(cfg.wall, { roughness: 0.95 });
  box(g, RW, RH, 0.12, wallM, 0, 0, -RD / 2); box(g, 0.12, RH, RD, wallM, -RW / 2, 0, 0); box(g, 0.12, RH, RD, wallM, RW / 2, 0, 0);
  const bb = M(0xfaf6ee, { roughness: 0.6 });
  box(g, RW - 0.1, 0.12, 0.04, bb, 0, 0, -RD / 2 + 0.07); box(g, 0.04, 0.12, RD - 0.1, bb, -RW / 2 + 0.07, 0, 0); box(g, 0.04, 0.12, RD - 0.1, bb, RW / 2 - 0.07, 0, 0);
  const ceil = add(g, new THREE.PlaneGeometry(RW, RD), M(0xe6dccb, { roughness: 1 }), 0, RH, 0, { r: [Math.PI / 2, 0, 0], cs: false });
  const glow = new THREE.MeshBasicMaterial({ color: 0xffe3b5 });
  add(g, new THREE.BoxGeometry(RW - 0.3, 0.04, 0.05), glow, 0, RH - 0.1, -RD / 2 + 0.12, { cs: false });
  add(g, new THREE.BoxGeometry(0.05, 0.04, RD - 0.3), glow, -RW / 2 + 0.12, RH - 0.1, 0, { cs: false });
  add(g, new THREE.BoxGeometry(0.05, 0.04, RD - 0.3), glow, RW / 2 - 0.12, RH - 0.1, 0, { cs: false });
  [[-2.4, -1.2], [2.4, -1.2], [-2.4, 1.4], [2.4, 1.4]].forEach(a => add(g, new THREE.CylinderGeometry(0.11, 0.11, 0.02, 20), glow, a[0], RH - 0.02, a[1], { cs: false }));
  box(g, RW, 0.1, 0.1, M(0xfaf6ee, { roughness: 0.6 }), 0, RH - 0.1, -RD / 2 + 0.06);
  const light = new THREE.PointLight(0xffe0b0, 22, 14, 1.6); light.position.set(0, RH - 0.7, 0.6); light.shadow.mapSize.set(1024, 1024); light.shadow.bias = -0.002; g.add(light);
  const fill = new THREE.PointLight(0xffe9cf, 10, 11, 1.7); fill.position.set(0, 1.8, 2.6); g.add(fill);
  const lamp = add(g, new THREE.SphereGeometry(0.13, 16, 12), new THREE.MeshBasicMaterial({ color: 0xfff0d0 }), 0, RH - 0.25, 0.4, { cs: false });
  return { g, light, cfg, cx: i * SPACING };
}
function windowOn(g, z, w = 1.7) {
  const ww = new THREE.Group(); ww.position.set(RW / 2 - 0.07, 0, z); ww.rotation.y = -Math.PI / 2; g.add(ww);
  add(ww, new THREE.PlaneGeometry(w, 1.5), new THREE.MeshBasicMaterial({ color: 0xeaf4ff, toneMapped: false }), 0, 1.65, 0.0, { cs: false });
  box(ww, w + 0.14, 0.07, 0.1, white, 0, 0.84, 0.02); box(ww, w + 0.14, 0.07, 0.1, white, 0, 2.34, 0.02); box(ww, 0.07, 1.5, 0.1, white, -w / 2 - 0.03, 0.88, 0.02); box(ww, 0.07, 1.5, 0.1, white, w / 2 + 0.03, 0.88, 0.02); box(ww, 0.05, 1.5, 0.08, white, 0, 0.9, 0.02);
  box(ww, 0.4, 2.55, 0.09, M(0xd9c7a8, { roughness: 1 }), -w / 2 - 0.3, 0.1, 0.07); box(ww, 0.4, 2.55, 0.09, M(0xd9c7a8, { roughness: 1 }), w / 2 + 0.3, 0.1, 0.07);
  const sun = new THREE.PointLight(0xcfe3ff, 2.2, 6, 2); sun.position.set(RW / 2 - 0.6, 1.8, z); g.add(sun);
}
function floorLamp(g, x, z) { cyl(g, 0.02, 0.02, 1.4, steel, x, 0, z, 8); cyl(g, 0.14, 0.14, 0.03, steel, x, 0, z, 16); add(g, new THREE.CylinderGeometry(0.14, 0.2, 0.28, 20, 1, true), M(0xfff1d6, { side: THREE.DoubleSide, emissive: 0xffd59a, emissiveIntensity: 1.1 }), x, 1.55, z, { cs: false }); const pl = new THREE.PointLight(0xffd9a0, 3, 4, 2); pl.position.set(x, 1.5, z); g.add(pl); }
function slatPanel(g, x, w, h) { for (let i = 0; i < w / 0.12; i++) box(g, 0.07, h, 0.05, woodMid, x - w / 2 + 0.06 + i * 0.12, 0.12, -RD / 2 + 0.09); }
const shCv = document.createElement('canvas'); shCv.width = shCv.height = 128; { const x = shCv.getContext('2d'), gr = x.createRadialGradient(64, 64, 4, 64, 64, 62); gr.addColorStop(0, 'rgba(0,0,0,.5)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = gr; x.fillRect(0, 0, 128, 128); }
const shTex = new THREE.CanvasTexture(shCv);
/* ---------- richer 3D furniture (illustrative models built in code) ---------- */
function ellipsoid(p, sx, sy, sz, mat, x, y, z, ry = 0) { const m = add(p, new THREE.SphereGeometry(1, 18, 14), mat, x, y, z); m.scale.set(sx, sy, sz); m.rotation.y = ry; return m; }
function archMesh(p, w, h, rise, depth, mat, x, y, z) {
  const sh = new THREE.Shape(); sh.moveTo(-w / 2, 0); sh.lineTo(w / 2, 0); sh.lineTo(w / 2, h); sh.quadraticCurveTo(0, h + rise * 2, -w / 2, h); sh.lineTo(-w / 2, 0);
  const m = add(p, new THREE.ExtrudeGeometry(sh, { depth, bevelEnabled: true, bevelSize: 0.012, bevelThickness: 0.012, bevelSegments: 2 }), mat, x, y, z); return m;
}
function knob(p, x, y, z) { ball(p, 0.017, gold, x, y, z); }
function panelBed(p, x, z) {
  const g = new THREE.Group(); g.position.set(x, 0, z); p.add(g); const W = 1.9;
  archMesh(g, W, 0.95, 0.2, 0.08, woodRich, 0, 0.2, -1.14);
  for (let k = -1; k <= 1; k++) box(g, 0.5, 0.62, 0.02, woodDark, k * 0.6, 0.38, -1.05);
  box(g, 0.06, 0.95, 0.06, woodDark, -W / 2, 0, -1.1); box(g, 0.06, 0.95, 0.06, woodDark, W / 2, 0, -1.1);
  box(g, W, 0.55, 0.07, woodRich, 0, 0.1, 1.07); for (let k = -1; k <= 1; k++) box(g, 0.5, 0.3, 0.02, woodDark, k * 0.6, 0.22, 1.115);
  box(g, 0.07, 0.3, 2.1, woodRich, -W / 2 + 0.03, 0.12, 0); box(g, 0.07, 0.3, 2.1, woodRich, W / 2 - 0.03, 0.12, 0);
  box(g, W - 0.12, 0.26, 2.0, M(0xf1ece2, { roughness: 0.95 }), 0, 0.26, 0);
  box(g, W - 0.1, 0.07, 1.4, M(0xfaf6ee, { roughness: 0.95 }), 0, 0.52, 0.32); box(g, W - 0.1, 0.075, 0.5, M(0xb0654a, { roughness: 0.95 }), 0, 0.525, 0.72);
  [-0.45, 0.45].forEach(px => ellipsoid(g, 0.3, 0.07, 0.19, M(0xfaf6ee, { roughness: 0.95 }), px, 0.62, -0.78));
  [-0.2, 0.2].forEach(px => ellipsoid(g, 0.17, 0.07, 0.11, M(0xb8955a, { roughness: 0.95 }), px, 0.66, -0.52));
}
function tableLamp(p, x, y, z) {
  cyl(p, 0.045, 0.06, 0.2, gold, x, y, z, 14); cyl(p, 0.012, 0.012, 0.12, gold, x, y + 0.2, z, 8);
  add(p, new THREE.CylinderGeometry(0.1, 0.17, 0.2, 20, 1, true), M(0xfff1d6, { side: THREE.DoubleSide, emissive: 0xffd59a, emissiveIntensity: 1.1 }), x, y + 0.38, z, { cs: false });
  const l = new THREE.PointLight(0xffd9a0, 2.2, 3.2, 2); l.position.set(x, y + 0.4, z); p.add(l);
}
function nightstand(p, x, z, ry = 0) {
  const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = ry; p.add(g);
  [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([a, b]) => box(g, 0.04, 0.12, 0.04, woodDark, a * 0.21, 0, b * 0.17));
  box(g, 0.5, 0.46, 0.4, woodRich, 0, 0.12, 0); box(g, 0.54, 0.035, 0.44, woodMid, 0, 0.58, 0);
  [0.18, 0.36].forEach(y => { box(g, 0.4, 0.015, 0.012, woodDark, 0, y, 0.205); knob(g, 0, y + 0.07, 0.215); });
  return 0.6;
}
function chestDrawers(p, x, z, ry, w, h, rows) {
  const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = ry; p.add(g);
  box(g, w, h, 0.45, woodRich, 0, 0.06, 0); box(g, w + 0.05, 0.04, 0.5, woodMid, 0, h + 0.06, 0); box(g, w + 0.02, 0.06, 0.47, woodDark, 0, 0, 0);
  const dh = h / rows;
  for (let i = 0; i < rows; i++) { box(g, w - 0.08, dh - 0.035, 0.012, woodMid, 0, 0.08 + i * dh + 0.01, 0.228); knob(g, -0.1, 0.08 + i * dh + dh / 2, 0.24); knob(g, 0.1, 0.08 + i * dh + dh / 2, 0.24); }
  return h + 0.1;
}
function dresserMirror(p, x, z, ry) {
  const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = ry; p.add(g);
  chestDrawers(g, 0, 0, 0, 1.5, 0.74, 3);
  archMesh(g, 0.78, 0.62, 0.14, 0.05, woodRich, 0, 0.88, -0.12);
  const m = archMesh(g, 0.64, 0.5, 0.11, 0.02, M(0xdde9ee, { roughness: 0.04, metalness: 0.95 }), 0, 0.94, -0.085);
}
function armoire(p, x, z, ry, w = 1.2, h = 2.05) {
  const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = ry; p.add(g);
  box(g, w, h, 0.58, woodRich, 0, 0.06, 0); box(g, w + 0.06, 0.08, 0.62, woodMid, 0, h + 0.06, 0); box(g, w + 0.02, 0.07, 0.6, woodDark, 0, 0, 0);
  for (let k = -1; k <= 1; k += 2) { box(g, w / 2 - 0.06, 1.2, 0.015, woodMid, k * (w / 4), 0.78, 0.298); box(g, w / 2 - 0.06, 0.5, 0.015, woodMid, k * (w / 4), 0.14, 0.298); knob(g, k * 0.06, 1.25, 0.31); }
  box(g, 0.008, h - 0.1, 0.01, M(0x1d0f07), 0, 0.08, 0.3);
  return h;
}
function artFrame(p, x, y, z, ry, w, h, seed = 0) {
  const g = new THREE.Group(); g.position.set(x, y, z); g.rotation.y = ry; p.add(g);
  const cv = document.createElement('canvas'); cv.width = 256; cv.height = Math.round(256 * h / w); const c = cv.getContext('2d');
  const pals = [['#e8d3b0', '#c98a5a', '#7a4e2e', '#3e5a4a'], ['#dfe7e3', '#9fb7b0', '#4f6f68', '#c9a15a'], ['#f0e0d0', '#d9876a', '#a8433a', '#5b3a2e']][seed % 3];
  c.fillStyle = pals[0]; c.fillRect(0, 0, cv.width, cv.height);
  for (let i = 0; i < 9; i++) { c.globalAlpha = 0.55; c.fillStyle = pals[1 + i % 3]; const r = 30 + ((i * 53 + seed * 31) % 70); c.beginPath(); c.ellipse(((i * 97 + seed * 41) % 256), ((i * 61 + 20) % cv.height), r, r * 0.7, i, 0, 6.3); c.fill(); }
  const tx = new THREE.CanvasTexture(cv); tx.colorSpace = THREE.SRGBColorSpace;
  box(g, w + 0.1, h + 0.1, 0.04, woodDark, 0, -(h + 0.1) / 2, 0); add(g, new THREE.PlaneGeometry(w, h), new THREE.MeshStandardMaterial({ map: tx, roughness: 0.8 }), 0, 0, 0.025, { cs: false });
}
function sideTable(p, x, z, h = 0.5) { cyl(p, 0.025, 0.025, h, gold, x, 0, z, 8); cyl(p, 0.26, 0.26, 0.04, woodRich, x, h, z, 28); cyl(p, 0.16, 0.16, 0.02, woodDark, x, 0, z, 20); return h + 0.04; }
function coffeeTable(p, x, z) {
  const g = new THREE.Group(); g.position.set(x, 0, z); p.add(g);
  box(g, 1.2, 0.05, 0.65, woodRich, 0, 0.4, 0); box(g, 1.0, 0.03, 0.5, woodDark, 0, 0.12, 0);
  [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([a, b]) => box(g, 0.05, 0.4, 0.05, woodDark, a * 0.55, 0, b * 0.27));
  return 0.45;
}
function tvUnit(p, x, z, ry) {
  const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = ry; p.add(g);
  box(g, 1.8, 0.45, 0.4, woodRich, 0, 0.08, 0); box(g, 1.2, 0.012, 0.01, woodDark, 0, 0.3, 0.205); box(g, 1.9, 0.04, 0.44, woodMid, 0, 0.53, 0);
  box(g, 1.35, 0.78, 0.04, M(0x0b0d10, { roughness: 0.25 }), 0, 0.8, 0); box(g, 1.3, 0.73, 0.005, M(0x1c2a3a, { roughness: 0.1, metalness: 0.3, emissive: 0x16283a, emissiveIntensity: 0.6 }), 0, 0.825, 0.025);
}
function sofa3(p, x, z, ry) { sofa(p, x, z, ry, 2.5); }
function plate(p, x, y, z) { cyl(p, 0.11, 0.09, 0.015, white, x, y, z, 20); }

/* ---------- the five rooms ---------- */
function furnish(r) {
  const g = r.g, id = r.cfg.id;
  if (id !== 'decor') windowOn(g, id === 'office' ? 1.6 : 2.0);
  if (id === 'bedroom') {
    slatPanel(g, 0, 3.0, 2.4); rug(g, 0, -0.5, 3.6, 3.0, 0x8c7a62); rug(g, 0, 1.6, 2.0, 1.0, 0xb89a72);
    panelBed(g, 0, -1.65);
    [-1.45, 1.45].forEach(sx => { const t = nightstand(g, sx, -2.7); tableLamp(g, sx, t, -2.7); });
    armoire(g, -2.9, -2.65, 0, 1.2); chestDrawers(g, 2.85, -2.7, 0, 0.8, 1.25, 5);
    dresserMirror(g, -3.62, 0.5, Math.PI / 2); artFrame(g, -3.9, 1.85, 0.5, Math.PI / 2, 0.8, 0.6, 1); artFrame(g, 0, 2.15, -2.9, 0, 0.0001, 0.0001, 0);
    floorLamp(g, 3.4, -1.3); plant(g, 3.4, 0, 0.9, 1.8, 0xe86a92);
  } else if (id === 'living') {
    rug(g, 0, -0.8, 4.4, 3.0, 0x9a8466); sofa3(g, 0, -2.25, 0); [-1.75, 1.75].forEach(sx => { const t = sideTable(g, sx, -2.45); tableLamp(g, sx, t, -2.45); });
    sofa(g, -2.75, -0.7, Math.PI / 2, 1.7); armchair(g, 2.55, -0.9, -Math.PI / 2.4);
    const th = coffeeTable(g, 0, -0.75); vase(g, -0.2, th, -0.75, 0xe9c4cc, 1.0); box(g, 0.28, 0.04, 0.2, woodMid, 0.25, th, -0.7);
    showcase(g, -3.25, -2.7, 0, 1.25); showcase(g, 3.25, -2.7, 0, 1.25); artFrame(g, 0, 2.05, -2.9, 0, 1.3, 0.8, 0); artFrame(g, -3.9, 1.75, -0.7, Math.PI / 2, 0.7, 0.5, 2);
    plant(g, 3.5, 0, 1.0, 1.8, null); floorLamp(g, -3.6, -2.5);
  } else if (id === 'dining') {
    rug(g, 0, -0.3, 4.2, 3.2, 0x8e7a5e); const tb = table(g, 0, -0.3, 2.0, 1.0, woodRich, 0.76);
    [-0.65, 0, 0.65].forEach(x => { chair(g, x, -1.0, 0); chair(g, x, 0.4, Math.PI); }); chair(g, -1.3, -0.3, Math.PI / 2); chair(g, 1.3, -0.3, -Math.PI / 2);
    [-0.65, 0.65].forEach(x => { plate(g, x, 0.77, -0.65); plate(g, x, 0.77, 0.05); }); vase(g, 0, 0.77, -0.3, 0xcfd9c4, 1.1);
    pendant(g, 0, -0.3, RH - 1.25);
    const sb = chestDrawers(g, -2.4, -2.7, 0, 1.7, 0.78, 2); vase(g, -2.0, sb, -2.7, 0xb9d3dc, 1.1); plant(g, -2.8, sb, -2.7, 1.1, 0xf3c44f);
    showcase(g, 2.7, -2.7, 0, 1.4); artFrame(g, -2.4, 1.9, -2.9, 0, 1.1, 0.7, 1); floorLamp(g, 3.5, 0.6); plant(g, -3.5, 0, 1.2, 1.7, null);
  } else if (id === 'office') {
    rug(g, 0, -1.4, 2.8, 2.0, 0x77695a); desk(g, 0, -2.4); officeChair(g, 0, -1.55, Math.PI); bookshelf(g, 3.7, -0.6, -Math.PI / 2, 1.5); bookshelf(g, -3.7, -1.5, Math.PI / 2, 1.2);
    chair(g, -0.5, 0.2, 0); chair(g, 0.5, 0.2, 0); table(g, 0, 0.8, 1.2, 0.6, woodMid, 0.55); plant(g, 3.2, 0, -2.6, 1.8, null); floorLamp(g, -3.2, -2.7); artFrame(g, 0, 2.3, -2.9, 0, 1.0, 0.6, 2); tableLamp(g, 0.5, 0.77, -2.5);
    chestDrawers(g, 2.4, -2.7, 0, 0.9, 0.7, 3);
  } else {
    /* decor gallery */
    rug(g, 0, 0.2, 3.6, 2.4, 0xa89678);
    const s = shelfUnit(g, 0, -2.72, 2.2, 1.9); const cols = [0xf1ece2, 0xb9d3dc, 0xe9c4cc, 0x2b2622, 0xe7d9a8];
    for (let sh = 0; sh < 4; sh++) for (let k = 0; k < 4; k++) { const y = 0.135 + sh * 0.4375, x = -0.8 + k * 0.53; ((sh + k) % 3 === 0) ? vase(s, x, y, 0, cols[(k + sh) % 5], 0.9) : plant(s, x, y, 0, 1.0, [0xe86a92, 0xf3c44f, 0xc56ae8, 0xff8a4f][(k + sh) % 4]); }
    shelfUnit(g, -3.0, -2.72, 1.1, 1.6); shelfUnit(g, 3.0, -2.72, 1.1, 1.6);
    [-3.0, 3.0].forEach(x => { for (let sh = 0; sh < 3; sh++) { plant(g, x - 0.28, 0.135 + sh * 0.365, -2.72, 0.9, [0xe86a92, 0xf3c44f][sh % 2]); vase(g, x + 0.28, 0.135 + sh * 0.365, -2.72, cols[sh], 0.8); } });
    [-2.4, -0.8, 0.8, 2.4].forEach((x, i) => hangingBasket(g, x, RH - 1.2 - (i % 2) * 0.2, 1.0));
    [-1.6, 1.6].forEach(x => plant(g, x, 0, -0.8, 3.2, 0xe86a92)); wallMirror(g, -3.9, 1.7, 0.2, Math.PI / 2); wallMirror(g, 3.9, 1.7, 0.2, -Math.PI / 2);
    cyl(g, 0.3, 0.3, 0.45, woodMid, -1.2, 0, 1.4); cyl(g, 0.3, 0.3, 0.45, woodMid, 1.2, 0, 1.4); vase(g, -1.2, 0.45, 1.4, 0xe9c4cc, 1.2); plant(g, 1.2, 0.45, 1.4, 1.2, 0xf3c44f);
  }
}
function roomProducts(cfg) { return TF.products().filter(p => cfg.group ? p.group === cfg.group : cfg.cats.includes(p.cat)); }

ROOMS.forEach((cfg, i) => { const r = roomShell(cfg, i); furnish(r); rooms.push(r); });
/* ground */
const ground = new THREE.Mesh(new THREE.PlaneGeometry(240, 80), M(0x2a2018, { roughness: 1 })); ground.rotation.x = -Math.PI / 2; ground.position.y = -0.01; ground.receiveShadow = true; scene.add(ground);
rooms.forEach(r => {
  r.prods = roomProducts(r.cfg);
  /* real 3D models (.glb) from the catalog, if any */
  r.prods.filter(p => p.model).slice(0, 3).forEach((p, k) => gltf.load(p.model, m => {
    const o = m.scene, b = new THREE.Box3().setFromObject(o), sz = b.getSize(new THREE.Vector3()), s = 1.4 / Math.max(sz.x, sz.y, sz.z);
    o.scale.setScalar(s); b.setFromObject(o); o.position.set(-1.8 + k * 1.8 - b.min.x - (b.max.x - b.min.x) / 2, -b.min.y, 1.4);
    o.traverse(c => { if (c.isMesh) { c.castShadow = true; c.receiveShadow = true; } }); r.g.add(o);
  }));
});

/* id, x, z, height (m) OR width (m). Sizes are approximate, for display only. */
const HALL_ITEMS = [
  ['geometric-three-door-wardrobe', -8.6, -6, { h: 2.0 }], ['scrollwork-two-door-wardrobe', -6.4, -6, { h: 1.95 }], ['carved-band-three-door-wardrobe', -4.0, -6, { h: 1.95 }], ['open-hanging-rack-unit', -1.3, -6, { h: 1.9 }],
  ['carved-chest-with-cupboard', 2.0, -6, { h: 1.05 }], ['carved-chest-cabinet', 4.5, -6, { h: 1.05 }], ['five-drawer-chest', 6.7, -6, { h: 1.2 }], ['two-door-cabinet-with-drawer', 8.8, -6, { h: 1.15 }],
  ['arched-headboard-carved-bed', -7.6, -1.2, { w: 2.2 }], ['bedside-drawers', -5.0, -1.2, { w: 1.1 }],
  ['executive-study-desk', 2.6, -1.2, { h: 1.55 }], ['study-table-with-side-cabinet', 5.2, -1.2, { h: 1.6 }],
  ['three-piece-sofa-set', -5.4, 3.4, { w: 4.4 }], ['carved-arm-sofa', -1.4, 3.4, { w: 2.0 }], ['six-chair-glass-dining-set', 5.0, 3.4, { w: 3.0 }]
];
/* ---------- 360° carousels: real products (cut out) standing on a turning platform. Drag with the mouse to look around. ---------- */
const DECOR_RING = ['lavender-pot', 'blue-clematis', 'pink-flower-pot', 'red-blossoms', 'sunflower-pot', 'yellow-flower-pot', 'yellow-roses', 'purple-roses', 'lavender-planter', 'aloe-plant', 'green-pothos-pot', 'palm-plant', 'succulent-pot', 'tulips-in-vase', 'lavender-vase', 'ceramic-vases', 'pink-lily', 'pink-cosmos', 'red-cosmos', 'hanging-basket', 'hanging-flower-basket', 'decorative-wall-mirror', 'floral-wall-mirror', 'feather-dream-catcher', 'wooden-wall-shelf'];
let ringMode = -1, autoOn = true; const AUTO = 0.16, TAU = Math.PI * 2;
const wrapPi = a => ((a + Math.PI) % TAU + TAU) % TAU - Math.PI;
function buildRing(cfg) {
  const isF = cfg.group === 'furniture';
  const defs = isF ? HALL_ITEMS.map(([id, , , sz]) => ({ id, sz })) : DECOR_RING.map(id => ({ id, sz: { fit: [1.25, 1.6] } }));
  const R0 = { g: new THREE.Group(), cfg, boards: [], prods: [], th: [], rot: 0, target: null, R: 4 };
  R0.g.position.set(cfg.cx, 0, 0); scene.add(R0.g);
  const ft = woodTexture('#8a5d3a', '#2a170c'); ft.repeat.set(6, 6);
  const gap = isF ? 0.7 : 0.3;
  Promise.all(defs.map(d => new Promise(res => loader.load('assets/cutouts/' + d.id + '.webp', tx => { tx.colorSpace = THREE.SRGBColorSpace; tx.anisotropy = 8; res({ d, tx }); }, undefined, () => res(null))))).then(list => {
    list = list.filter(Boolean).map(({ d, tx }) => { const a = tx.image.width / tx.image.height; let h; if (d.sz.h) h = d.sz.h; else if (d.sz.w) h = d.sz.w / a; else h = Math.min(d.sz.fit[1], d.sz.fit[0] / a); return { d, tx, h, w: h * a }; });
    const total = list.reduce((t, i) => t + i.w + gap, 0), R = Math.max(3.2, total / TAU); R0.R = R;
    const floor = new THREE.Mesh(new THREE.CircleGeometry(R + 2.4, 96), M(0xffffff, { map: ft, roughness: 0.45 })); floor.rotation.x = -Math.PI / 2; floor.position.y = -0.005; R0.g.add(floor);
    [R + 0.9, R + 2.3].forEach((rr, k) => { const t = new THREE.Mesh(new THREE.RingGeometry(rr, rr + (k ? 0.1 : 0.05), 128), new THREE.MeshBasicMaterial({ color: 0xb8955a })); t.rotation.x = -Math.PI / 2; t.position.y = 0.01; R0.g.add(t); });
    const sp = new THREE.PointLight(0xffe2b8, 40, R * 4, 1.4); sp.position.set(0, 5.5, 0); R0.g.add(sp); const sp2 = new THREE.PointLight(0xffe9cf, 26, R * 4, 1.4); sp2.position.set(0, 2.2, R + 3); R0.g.add(sp2);
    let cum = 0;
    list.forEach(({ d, tx, h, w }) => {
      const prod = TF.byId(d.id); if (!prod) return; R0.prods.push(prod);
      const th = (cum + w / 2) / R; cum += w + gap; R0.th.push(th);
      const root = new THREE.Group(); R0.g.add(root); const board = new THREE.Group(); root.add(board);
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tx, transparent: true, alphaTest: 0.08, toneMapped: false, side: THREE.DoubleSide }));
      mesh.position.y = h / 2 + (/hanging/.test(d.id) ? 0.9 : 0); board.add(mesh); mesh.userData.product = prod; frames.push(mesh);
      const sh = new THREE.Mesh(new THREE.PlaneGeometry(w * 1.15, Math.max(0.3, w * 0.3)), new THREE.MeshBasicMaterial({ map: shTex, transparent: true, depthWrite: false, toneMapped: false })); sh.rotation.x = -Math.PI / 2; sh.position.y = 0.02; root.add(sh);
      R0.boards.push({ root, board, prod });
    });
    if (cur === ALL.length - RINGS.length + RINGS.indexOf(cfg)) drawList();
  });
  return R0;
}
RINGS.forEach(c => rings.push(buildRing(c)));
const ringName = document.getElementById('ringName');
function enterRing(k) {
  ringMode = k; const r = rings[k]; tween = null; document.body.classList.add('ring-on');
  controls.minDistance = 3; controls.maxDistance = 16; controls.maxPolarAngle = Math.PI * 0.49;
  camera.position.set(r.cfg.cx, 2.4, r.R + 5.0); controls.target.set(r.cfg.cx, 0.95, 0);
}
function leaveRing() { if (ringMode < 0) return; ringMode = -1; document.body.classList.remove('ring-on'); }
function focusIdx() { const r = rings[ringMode]; let best = 0, bd = 1e9; r.boards.forEach((b, k) => { const d = b.root.getWorldPosition(new THREE.Vector3()).distanceTo(camera.position); if (d < bd) { bd = d; best = k; } }); return best; }
function stepRing(d) { const r = rings[ringMode], N = r.boards.length; if (!N) return; const i = (focusIdx() + d + N) % N; r.target = wrapPi(-r.th[i]) ; autoOn = false; const bt = document.getElementById('ringAuto'); if (bt) bt.textContent = '▶'; }
document.getElementById('ringPrev')?.addEventListener('click', () => stepRing(-1));
document.getElementById('ringNext')?.addEventListener('click', () => stepRing(1));
document.getElementById('ringAuto')?.addEventListener('click', e => { autoOn = !autoOn; rings.forEach(r => r.target = null); e.currentTarget.textContent = autoOn ? '❚❚' : '▶'; });
addEventListener('keydown', e => { if (ringMode < 0) return; if (e.key === 'ArrowLeft') stepRing(-1); if (e.key === 'ArrowRight') stepRing(1); });
function ringTick(dt) {
  if (ringMode < 0) return; const r = rings[ringMode]; if (!r.boards.length) return;
  if (r.target !== null) { const diff = wrapPi(r.target - r.rot); r.rot += diff * Math.min(1, dt * 4); if (Math.abs(diff) < 0.003) { r.rot = r.target; r.target = null; } }
  else if (autoOn && !hover) r.rot += AUTO * dt * (1 / Math.max(1, r.R / 4.5));
  r.boards.forEach((b, k) => { const th = r.th[k] + r.rot; b.root.position.set(Math.sin(th) * r.R, 0, Math.cos(th) * r.R); const wp = b.root.position.clone().add(r.g.position); b.board.rotation.y = Math.atan2(camera.position.x - wp.x, camera.position.z - wp.z); });
  const f = r.boards[focusIdx()]; if (ringName && f) { ringName.textContent = L(f.prod.name) + '  →'; ringName.dataset.id = f.prod.id; }
}
ringName?.addEventListener('click', () => { if (ringName.dataset.id) location.href = 'product.html?id=' + ringName.dataset.id; });


/* ---------- Furniture Hall: real furniture photos (cut out) arranged on the floor. Orbit with the mouse. ---------- */
const HALL = { id: 'hall', en: 'Furniture Showroom', bn: 'ফার্নিচার শোরুম', cx: 230 };
const HALL_ZONES = [
  { en: 'Wardrobes', bn: 'ওয়ার্ডরোব ও আলমারি', x: -4.9, z: -4.5 }, { en: 'Storage & Drawers', bn: 'ড্রয়ার ও স্টোরেজ', x: 5.6, z: -4.5 },
  { en: 'Bedroom', bn: 'বেডরুম', x: -6.3, z: 0.4 }, { en: 'Office & Study', bn: 'অফিস ও স্টাডি', x: 3.9, z: 0.4 },
  { en: 'Living', bn: 'লিভিং', x: -3.4, z: 4.9 }, { en: 'Dining', bn: 'ডাইনিং', x: 5.0, z: 4.9 }
];
const hall = { g: new THREE.Group(), boards: [], prods: [] };
function buildHall() {
  const g = hall.g; g.position.set(HALL.cx, 0, 0); scene.add(g);
  const ft = woodTexture('#a0714a', '#2a170c'); ft.repeat.set(10, 6);
  add(g, new THREE.PlaneGeometry(32, 24.6), M(0xffffff, { map: ft, roughness: 0.45 }), 0, 0, 3.2, { r: [-Math.PI / 2, 0, 0], cs: false });
  const wallM = M(0xe9decb, { roughness: 0.95 }), WH = 4.6;
  box(g, 32, WH, 0.2, wallM, 0, 0, -9.2); box(g, 0.2, WH, 24.6, wallM, -16, 0, 3.2); box(g, 0.2, WH, 24.6, wallM, 16, 0, 3.2); box(g, 32, WH, 0.2, wallM, 0, 0, 15.6);
  box(g, 31.8, 0.14, 0.05, M(0xfaf6ee), 0, 0, -9.08);
  for (let i = -7; i <= 7; i++) box(g, 0.5, WH, 0.07, M(0xd9c6a6, { roughness: 1 }), i * 2.2, 0, -9.06);
  add(g, new THREE.PlaneGeometry(32, 24.6), M(0xf0e6d4, { roughness: 1 }), 0, WH, 3.2, { r: [Math.PI / 2, 0, 0], cs: false });
  box(g, 6, 0.06, 0.06, M(0xffe9b8, { emissive: 0xffd48a, emissiveIntensity: 0.9 }), 0, 3.7, -9.0);
  [[-9, -3], [0, -3], [9, -3], [-9, 3], [0, 3], [9, 3], [-9, 10], [0, 10], [9, 10]].forEach(([x, z]) => { const l = new THREE.PointLight(0xffe2b8, 18, 15, 1.6); l.position.set(x, 4.0, z); g.add(l); });
  const rugs = [[-6.4, -1.2, 5.6, 3.2, 0x8c7a62], [3.9, -1.2, 5.4, 3.2, 0x77695a], [-3.4, 3.4, 8.2, 3.2, 0x9a8466], [5.0, 3.4, 4.6, 3.2, 0x8e7a5e]];
  rugs.forEach(([x, z, w, d, c]) => rug(g, x, z, w, d, c));
  document.fonts.ready.then(() => HALL_ZONES.forEach(z => {
    const cv = document.createElement('canvas'); cv.width = 768; cv.height = 128; const c = cv.getContext('2d');
    c.fillStyle = 'rgba(28,17,10,0.0)'; c.fillRect(0, 0, 768, 128); c.fillStyle = '#f2e3c4'; c.font = '600 54px "Hind Siliguri","Inter",sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
    z.cv = cv; z.ctx = c;
    const tx = new THREE.CanvasTexture(cv); tx.colorSpace = THREE.SRGBColorSpace; z.tx = tx;
    const m = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 0.6), new THREE.MeshBasicMaterial({ map: tx, transparent: true, toneMapped: false }));
    m.rotation.x = -Math.PI / 2; m.position.set(z.x, 0.06, z.z); m.renderOrder = 5; g.add(m); z.mesh = m; drawZone(z);
  }));
  /* soft contact shadow texture */
  const sc = document.createElement('canvas'); sc.width = sc.height = 128; const sx = sc.getContext('2d'); const gr = sx.createRadialGradient(64, 64, 4, 64, 64, 62); gr.addColorStop(0, 'rgba(0,0,0,.55)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); sx.fillStyle = gr; sx.fillRect(0, 0, 128, 128);
  const shTex = new THREE.CanvasTexture(sc);
  HALL_ITEMS.forEach(([id, x, z, sz]) => {
    const prod = TF.byId(id); if (!prod) return; hall.prods.push(prod);
    const root = new THREE.Group(); root.position.set(x, 0, z); g.add(root);
    const board = new THREE.Group(); root.add(board); hall.boards.push(board);
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ transparent: true, alphaTest: 0.08, toneMapped: false, side: THREE.DoubleSide, opacity: 0 }));
    board.add(plane); plane.userData.product = prod; frames.push(plane);
    loader.load('assets/cutouts/' + id + '.webp', tx => {
      tx.colorSpace = THREE.SRGBColorSpace; tx.anisotropy = 8; const a = tx.image.width / tx.image.height;
      const h = sz.h || sz.w / a, w = h * a; plane.geometry.dispose(); plane.geometry = new THREE.PlaneGeometry(w, h);
      plane.position.y = h / 2; plane.material.map = tx; plane.material.opacity = 1; plane.material.needsUpdate = true;
      const sh = new THREE.Mesh(new THREE.PlaneGeometry(w * 1.15, Math.max(0.5, w * 0.34)), new THREE.MeshBasicMaterial({ map: shTex, transparent: true, depthWrite: false, toneMapped: false }));
      sh.rotation.x = -Math.PI / 2; sh.position.set(0, 0.015, 0.02); root.add(sh);
    });
  });
}
function drawZone(z) {
  if (!z.ctx) return; z.ctx.clearRect(0, 0, 768, 128);
  const t = lang() === 'bn' ? z.bn : z.en, w = z.ctx.measureText(t).width + 56; z.ctx.fillStyle = 'rgba(28,17,10,.72)'; z.ctx.beginPath(); z.ctx.roundRect(384 - w / 2, 22, w, 84, 42); z.ctx.fill();
  z.ctx.fillStyle = '#f2e3c4'; z.ctx.fillText(t, 384, 66); z.tx.needsUpdate = true;
}
buildHall();
const HALLI = ALL.length;
function hallTick() { const bl = cur === HALLI ? hall.boards : cur < ROOMS.length ? rooms[cur].boards : []; if (!bl) return; bl.forEach(b => { const wp = b.getWorldPosition(new THREE.Vector3()); b.rotation.y = Math.atan2(camera.position.x - wp.x, camera.position.z - wp.z); }); }
const hallNote = document.getElementById('vsHallNote');
function setHallNote() { if (hallNote) hallNote.textContent = lang() === 'bn' ? 'এগুলো আমাদের আসল ফার্নিচারের ছবি, ঘরের সাজানো অবস্থান উদাহরণ মাত্র। মাউস দিয়ে ঘুরিয়ে দেখুন, স্ক্রল করে জুম করুন। ছবি বলে ফার্নিচার সবসময় আপনার দিকে মুখ করে থাকে। বিস্তারিত দেখতে ক্লিক করুন।' : 'These are photos of our real furniture; the arrangement is an example. Drag to look around and scroll to zoom. Because they are photos, each piece always turns to face you. Click one for details.'; }

/* ---------- camera presets + UI ---------- */
let cur = 0, tween = null;
const PRE = i => ({ pos: new THREE.Vector3(i * SPACING, 1.65, 4.9), tgt: new THREE.Vector3(i * SPACING, 1.25, -1.5) });
function goRoom(i, instant) {
  cur = i;
  document.body.classList.toggle('hall-on', i === HALLI);
  if (i === HALLI) {
    const wasR = ringMode >= 0; leaveRing(); rooms.forEach(r => { r.light.castShadow = false; });
    controls.minDistance = 3; controls.maxDistance = 14; controls.maxPolarAngle = Math.PI * 0.47;
    const p = { pos: new THREE.Vector3(HALL.cx, 3.0, 9.4), tgt: new THREE.Vector3(HALL.cx, 1.0, -1.4) };
    if (instant || wasR) { camera.position.copy(p.pos); controls.target.copy(p.tgt); tween = null; } else tween = { t: 0, p0: camera.position.clone(), t0: controls.target.clone(), p1: p.pos, t1: p.tgt };
    document.querySelectorAll('.vs-tab').forEach(b => b.classList.toggle('on', +b.dataset.i === i)); setHallNote(); drawList(); return;
  }
  controls.minDistance = 1.5; controls.maxDistance = 8; controls.maxPolarAngle = Math.PI * 0.49;
  if (i >= ROOMS.length) { enterRing(i - ROOMS.length); rooms.forEach(r => { r.light.castShadow = false; }); document.querySelectorAll('.vs-tab').forEach(b => b.classList.toggle('on', +b.dataset.i === i)); drawList(); return; }
  const wasRing = ringMode >= 0; leaveRing(); if (wasRing) instant = true;
  const p = PRE(i);
  rooms.forEach((r, k) => { r.light.castShadow = k === i; });
  document.querySelectorAll('.vs-tab').forEach(b => b.classList.toggle('on', +b.dataset.i === i));
  tween = instant ? null : { t: 0, p0: camera.position.clone(), t0: controls.target.clone(), p1: p.pos, t1: p.tgt };
  if (instant) { camera.position.copy(p.pos); controls.target.copy(p.tgt); }
  drawList();
}
function drawList() {
  const r = cur === HALLI ? hall : cur < ROOMS.length ? rooms[cur] : rings[cur - ROOMS.length], el = document.getElementById('vsList'); if (!el) return;
  const nm = cur === HALLI ? HALL : ALL[cur]; document.getElementById('vsRoomName').textContent = lang() === 'bn' ? nm.bn : nm.en;
  const pl = r.prods; el.innerHTML = pl.length ? pl.map(p => `<a class="vs-item" href="product.html?id=${p.id}"><img src="${p.image}" alt="" loading="lazy"><span>${L(p.name)}</span></a>`).join('') : `<p style="color:var(--mute)">${t('noRes')}</p>`;
}
const lang = () => TF.lang();
function drawTabs() {
  const all = ALL.concat([HALL]), order = ALL.map((_, i) => i);
  document.getElementById('vsTabs').innerHTML = order.map(i => { const r = all[i]; return `<button class="vs-tab${i === cur ? ' on' : ''}${i >= ROOMS.length ? ' ring' : ''}${i === HALLI ? ' hall' : ''}" data-i="${i}">${lang() === 'bn' ? r.bn : r.en}</button>`; }).join('');
  document.querySelectorAll('.vs-tab').forEach(b => b.onclick = () => goRoom(+b.dataset.i));
  HALL_ZONES.forEach(drawZone); setHallNote();
}
drawTabs();
document.addEventListener('tf:render', () => { drawTabs(); drawList(); });

/* ---------- picking ---------- */
const ray = new THREE.Raycaster(), mouse = new THREE.Vector2(); let hover = null, down = null;
function pick(e) { const b = renderer.domElement.getBoundingClientRect(); mouse.set(((e.clientX - b.left) / b.width) * 2 - 1, -((e.clientY - b.top) / b.height) * 2 + 1); ray.setFromCamera(mouse, camera); const h = ray.intersectObjects(frames, false)[0]; return h ? h.object : null; }
renderer.domElement.addEventListener('pointermove', e => {
  const o = pick(e); hover = o; renderer.domElement.style.cursor = o ? 'pointer' : 'grab';
  if (o) { tip.style.display = 'block'; tip.style.left = e.offsetX + 14 + 'px'; tip.style.top = e.offsetY + 14 + 'px'; tip.textContent = L(o.userData.product.name) + '  →'; } else tip.style.display = 'none';
});
renderer.domElement.addEventListener('pointerdown', e => { down = [e.clientX, e.clientY]; });
renderer.domElement.addEventListener('pointerup', e => { if (down && Math.hypot(e.clientX - down[0], e.clientY - down[1]) < 5) { const o = pick(e); if (o) location.href = 'product.html?id=' + o.userData.product.id; } down = null; });

/* ---------- loop ---------- */
function resize() { const w = stage.clientWidth, h = stage.clientHeight; renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix(); }
addEventListener('resize', resize); resize();
const clock = new THREE.Clock();
function loop() {
  const dt = clock.getDelta();
  if (tween) { tween.t = Math.min(1, tween.t + dt / 1.4); const e = tween.t < 0.5 ? 2 * tween.t * tween.t : 1 - Math.pow(-2 * tween.t + 2, 2) / 2; camera.position.lerpVectors(tween.p0, tween.p1, e); controls.target.lerpVectors(tween.t0, tween.t1, e); if (tween.t >= 1) tween = null; }
  ringTick(dt); hallTick(); controls.update(); renderer.render(scene, camera); requestAnimationFrame(loop);
}
const start = new URLSearchParams(location.search).get('room'); let si = ALL.findIndex(r => r.id === start); if (start === 'hall') si = HALLI;
goRoom(si >= 0 ? si : 0, true); loop();
if (load) setTimeout(() => load.remove(), 400);
window.__vs = { goRoom, hall, rooms, rings, frames, renderer, stepRing };
