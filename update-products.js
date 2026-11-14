// Run this on your computer after adding photos:   node update-products.js
// It rebuilds products-data.js so a LOCAL preview shows your new photos.
// (On the live GitHub site, new photos appear automatically. You do not need to run this.)
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, 'products');
const out = [];
(function walk(dir) {
  for (const f of fs.readdirSync(dir).sort()) {
    const p = path.join(dir, f), s = fs.statSync(p);
    if (s.isDirectory()) walk(p);
    else if (/\.(jpe?g|png|webp|avif)$/i.test(f)) {
      out.push(path.relative(__dirname, p).split(path.sep).join('/'));
      if (s.size > 1.5 * 1024 * 1024) console.log('Warning: big photo (' + (s.size / 1048576).toFixed(1) + ' MB), site will load slowly:', f);
    }
  }
})(root);
fs.writeFileSync(path.join(__dirname, 'products-data.js'), 'window.PRODUCTS_PATHS = ' + JSON.stringify(out, null, 1) + ';\n');
console.log('Done. ' + out.length + ' photos found.');
