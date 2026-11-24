// Run this on your computer after you add new photos:    node tools/sync-catalog.js
// It finds every photo in assets/furniture/<category>/ and assets/home-decor/<category>/ and writes
// assets/js/data/discovered.js, so a LOCAL preview shows new photos at once.
// (On the live GitHub site, new photos appear by themselves. For a custom price, colour or description, add the
//  product to assets/js/data/catalog.js — see HOW-TO-ADD-PRODUCTS.txt.)
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const out = [];
(function walk(dir) {
  for (const f of fs.readdirSync(dir).sort()) {
    const p = path.join(dir, f), s = fs.statSync(p);
    if (s.isDirectory()) walk(p);
    else if (/\.(jpe?g|png|webp|avif)$/i.test(f)) {
      out.push(path.relative(root, p).split(path.sep).join('/'));
      if (s.size > 1.5 * 1024 * 1024) console.log('Warning: big photo (' + (s.size / 1048576).toFixed(1) + ' MB), the site will load slowly:', f);
    }
  }
})(path.join(root, 'assets'));
const keep = out.filter(p => /^assets\/(furniture|home-decor)\//.test(p));
fs.writeFileSync(path.join(root, 'assets/js/data/discovered.js'), 'window.DISCOVERED = ' + JSON.stringify(keep, null, 1) + ';\n');
console.log('Done. ' + keep.length + ' product photos found.');
