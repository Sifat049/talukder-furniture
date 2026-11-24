# Talukder Furniture & Home Decor

Website for **Talukder Furniture & Home Decor**, a furniture and home decor shop in Mokamtola, Bogura, Bangladesh. Owner: MD. Zillul Bary.

**Live site:** https://sifat049.github.io/talukder-furniture/

## Features

- Furniture and Home Decor catalog with product pages, search and cart
- Bangla (default) and English language switch
- 3D Virtual Showroom: Bedroom, Drawing Room, Dining, Office and Home Decor Gallery (Three.js). Drag with the mouse to look around.
- 360° view of products on a turning platform
- Room planner
- WhatsApp and phone contact buttons

## Contact

- Phone: 01724-553778
- WhatsApp: 01757-826005

## Tech

Static website: plain HTML, CSS and JavaScript. No build step and no backend. Three.js is included locally in the repo.

## Run locally

```
python3 -m http.server 8000
```

Then open http://localhost:8000 in the browser.

## Add or change products

Product data is in `assets/js/data/catalog.js`. Steps are written in `HOW-TO-ADD-PRODUCTS.txt`.

## Notes

- The showroom rooms are illustrative 3D layouts. Furniture shapes are generic and sizes are approximate. Real products are listed below each room.
- Some designs are marked "AI design preview" and are not photos of finished products.
