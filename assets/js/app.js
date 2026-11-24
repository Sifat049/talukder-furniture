/* Talukder Furniture & Home Decor — shared site logic
   (header, footer, language, search, cart, product cards, pages).
   Product data lives in assets/js/data/catalog.js — edit that file, not this one. */
(function () {
'use strict';
const S = window.SHOP, CATS = window.CATEGORIES;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const ICON = {
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 4h2.5l2.2 10.5a1 1 0 0 0 1 .8h8.6a1 1 0 0 0 1-.8L20 8H6.2"/><circle cx="9.5" cy="19.5" r="1.4"/><circle cx="17" cy="19.5" r="1.4"/></svg>',
  wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.2 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.2-.7-2.7-1.1-4.4-3.8-4.6-4-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.8-.1 1.4z"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M2 6h11v10H2zM13 9h4.5l3 3v4H13"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/></svg>',
  board: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 8l9-4 9 4-9 4zM3 12l9 4 9-4M3 16l9 4 9-4"/></svg>',
  eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
  cash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.6"/></svg>'
};

/* ---------------------------------------------------------------- TEXT */
const T = {
  en: {
    home: 'Home', furniture: 'Furniture', decor: 'Home Decor', showroom: 'Virtual Showroom', planner: 'Room Planner', about: 'About Us', contact: 'Contact',
    open: 'Open now · until 9 PM', closed: 'Closed now', topDel: 'Home delivery in Mokamtola upazila', viewAll: 'View all',
    all: 'All', addCart: 'Add to Cart', added: 'Added to cart', inquiry: 'WhatsApp Inquiry', quote: 'Request a Quote', priceNote: 'Price depends on size and board type. Ask us for today\'s price.',
    details: 'View details', related: 'You may also like', searchPh: 'Search furniture and home decor…', noRes: 'Nothing found. Try another word, or ask us on WhatsApp.',
    aiTag: 'AI design preview', aiNote: 'This image is an AI design preview, not a photo of the shop\'s actual item.',
    sortFeat: 'Featured', sortAZ: 'Name A–Z', items: 'items', product: 'product', products: 'products',
    cat: 'Category', colors: 'Available colors', materials: 'Materials', dims: 'Dimensions', avail: 'Availability', styling: 'Styling idea',
    st_available: 'Available', st_made: 'Made to order', st_ask: 'Ask us to confirm availability',
    askSize: 'Need a different size, colour or board type? Ask us on WhatsApp.',
    m3d: 'Illustrative 3D preview. The photographs show the actual product.', m3dExact: '3D model of this product', no3d: '3D preview for this item is not available yet. The photographs show the actual product.',
    notFound: 'Product not found', backTo: 'Back to all furniture',
    qty: 'Quantity', cartT: 'Your Cart', cartEmpty: 'Your cart is empty.', cartEmptyP: 'Add furniture or home decor and send us your list on WhatsApp.', continue: 'Continue browsing',
    remove: 'Remove', summary: 'Order summary', sumItems: 'Items', cartHow: 'Send your list on WhatsApp and we will confirm price, availability and delivery. Payment is cash.',
    yourName: 'Your name', yourPhone: 'Phone number', yourAddr: 'Delivery area (optional)', sendOrder: 'Send order on WhatsApp', clear: 'Clear cart',
    sendMsg: 'Send message on WhatsApp', msg: 'Message', phone: 'Phone',
    heroK: 'Mokamtola, Bogura', heroH: 'Furniture of Trust, <em>Built for a Lifetime.</em>',
    heroP: 'Beds, dining sets, almirahs, wardrobes and office furniture, with beautiful home decor to finish every room. See everything in person at our showroom.',
    ctaShow: 'Explore Showroom', ctaColl: 'Explore Collection', heroTag: 'Photographs of our real showroom and products',
    t1: 'Good quality boards', t1d: 'Vtex, MDF and Melamine', t2: 'Home delivery', t2d: 'Within Mokamtola upazila', t3: 'See before you buy', t3d: 'Full showroom, Talukder Market', t4: 'Simple payment', t4d: 'Cash',
    shopK: 'Shop by room', shopH: 'Two ways to make a home', shopP: 'Solid furniture for every room, and decor that finishes it.',
    tf: 'Furniture', tfp: 'Beds, dining sets, almirahs, showcases and office furniture.', td: 'Home Decor', tdp: 'Flower pots, plants, vases, hanging baskets and wall decor.', shopNow: 'Shop now',
    featK: 'Featured', featF: 'From our furniture showroom', featD: 'Home decor, ready to style',
    decK: 'Home Decor', decH: 'Details that finish a room', decP: 'Pots, plants, vases, hanging baskets and wall pieces. Each one photographed in our shop, so you see exactly what you get.', decBtn: 'Explore Home Decor',
    vsK: 'Virtual Showroom', vsH: 'Walk through our showroom, in 3D', vsP: 'Explore bedroom, drawing room, dining room, office and home decor spaces in 3D. Drag to look around.', vsP2: 'These are illustrative 3D layouts with generic furniture shapes; sizes are approximate. Our real products are listed below each room.', vsBtn: 'Enter Showroom',
    galK: 'Inside our shop', galH: 'Come and see it in person', galP: 'These are real photographs of the Talukder showroom.',
    visitK: 'Visit us', visitH: 'Find us at Talukder Market',
    fK: 'Furniture', fH: 'Our Furniture', fP: 'Photographs of the real furniture in our showroom. Tap any item for details and more photos.',
    dK: 'Home Decor', dH: 'Home Decor', dP: 'A premium decor corner for every room: flowers, plants, vases, baskets and wall pieces.',
    shopCat: 'Shop by category', collK: 'Collections', collH: 'Curated collections', styled: 'Styled in our showroom', inq: 'Ask about any decor item on WhatsApp',
    decCtaH: 'Not sure what suits your room?', decCtaP: 'Send us a photo of your space on WhatsApp and we will suggest pieces from our shop.',
    ab: 'About Us', abH: 'A local shop you can trust', abP1: 'Talukder Furniture & Home Decor is a furniture and home decor showroom at Talukder Market, Mokamtola, Bogura, run by MD. Zillul Bary.', abP2: 'We sell good-quality furniture made from Vtex, MDF and Melamine board, along with home decor for every room. Come to the shop, see and compare before you buy.', abP3: 'For customers in Mokamtola upazila, we offer home delivery. Payment is cash.',
    owner: 'Owner', ownerBox: 'Run by', deliv: 'Home delivery', delivD: 'Within Mokamtola upazila', pay: 'Payment', payD: 'Cash', visit: 'Visit', visitD: 'Talukder Market, Mokamtola',
    cK: 'Contact', cH: 'We are easy to find', addr: 'Address', hrs: 'Opening hours', satThu: 'Saturday to Thursday', fri: 'Friday', directions: 'Get Directions', callUs: 'Call us', talk: 'Talk to us', fb: 'Facebook page', payNote: 'Payment: cash. Home delivery within Mokamtola upazila.',
    fAbout: 'Furniture of Trust, Built for a Lifetime. Quality furniture and home decor in Mokamtola, Bogura.', fShop: 'Shop', fVisit: 'Visit', fRights: 'All rights reserved.',
    vsPageH: 'Virtual Showroom', vsPageP: 'Choose a room and look around. Click a framed photograph to open that product.',
    planH: 'Room Planner', planP: 'Plan your room layout in feet before you buy. Drag items, rotate them and send the plan to us.',
    plRoom: 'Room size (feet)', plW: 'Width', plL: 'Length', plAdd: 'Add furniture', plSel: 'Selected item', plRot: 'Rotate 90°', plDup: 'Duplicate', plDel: 'Delete', plClr: 'Clear all', plSend: 'Send plan on WhatsApp', plPng: 'Download picture', plItems: 'Items in room',
    plNote: 'Items are generic sizes to help you check fit. They are not exact product sizes. Change the width and length of any item to match what you plan to buy, and ask us for exact sizes.', plHint: 'Drag items to move them. Press R to rotate, Delete to remove.',
    waGen: 'Assalamu alaikum, I want to know about your furniture and home decor (Talukder Furniture website)',
    waProd: n => `Assalamu alaikum, I want to know the price and availability of: ${n} (Talukder Furniture website)`
  },
  bn: {
    home: 'হোম', furniture: 'ফার্নিচার', decor: 'হোম ডেকর', showroom: 'ভার্চুয়াল শোরুম', planner: 'রুম প্ল্যানার', about: 'আমাদের কথা', contact: 'যোগাযোগ',
    open: 'এখন খোলা · রাত ৯টা পর্যন্ত', closed: 'এখন বন্ধ', topDel: 'মোকামতলা উপজেলায় হোম ডেলিভারি', viewAll: 'সব দেখুন',
    all: 'সব', addCart: 'কার্টে যোগ করুন', added: 'কার্টে যোগ হয়েছে', inquiry: 'হোয়াটসঅ্যাপে জিজ্ঞেস করুন', quote: 'দামের জন্য জানুন', priceNote: 'সাইজ ও বোর্ড অনুযায়ী দাম ভিন্ন হয়। আজকের দাম জানতে আমাদের জিজ্ঞেস করুন।',
    details: 'বিস্তারিত দেখুন', related: 'আরও দেখতে পারেন', searchPh: 'ফার্নিচার ও হোম ডেকর খুঁজুন…', noRes: 'কিছু পাওয়া যায়নি। অন্য শব্দ দিয়ে চেষ্টা করুন, অথবা হোয়াটসঅ্যাপে জিজ্ঞেস করুন।',
    aiTag: 'এআই ডিজাইন প্রিভিউ', aiNote: 'এই ছবিটি একটি এআই ডিজাইন প্রিভিউ, দোকানের আসল পণ্যের ছবি নয়।',
    sortFeat: 'বাছাই করা', sortAZ: 'নাম অনুযায়ী', items: 'টি', product: 'টি পণ্য', products: 'টি পণ্য',
    cat: 'ক্যাটাগরি', colors: 'পাওয়া যায় যে রঙে', materials: 'উপাদান', dims: 'মাপ', avail: 'প্রাপ্যতা', styling: 'সাজানোর আইডিয়া',
    st_available: 'পাওয়া যায়', st_made: 'অর্ডার দিয়ে বানানো হয়', st_ask: 'আছে কি না জানতে জিজ্ঞেস করুন',
    askSize: 'অন্য সাইজ, রং বা বোর্ড চান? হোয়াটসঅ্যাপে জিজ্ঞেস করুন।',
    m3d: 'এটি একটি উদাহরণমূলক ৩ডি প্রিভিউ। ছবিগুলোই আসল পণ্য।', m3dExact: 'এই পণ্যের ৩ডি মডেল', no3d: 'এই পণ্যের ৩ডি প্রিভিউ এখনো নেই। ছবিগুলোই আসল পণ্য।',
    notFound: 'পণ্য পাওয়া যায়নি', backTo: 'সব ফার্নিচারে ফিরে যান',
    qty: 'পরিমাণ', cartT: 'আপনার কার্ট', cartEmpty: 'আপনার কার্ট খালি।', cartEmptyP: 'ফার্নিচার বা হোম ডেকর যোগ করে তালিকা হোয়াটসঅ্যাপে পাঠান।', continue: 'দেখা চালিয়ে যান',
    remove: 'মুছুন', summary: 'অর্ডারের সারসংক্ষেপ', sumItems: 'আইটেম', cartHow: 'তালিকা হোয়াটসঅ্যাপে পাঠান, আমরা দাম, প্রাপ্যতা ও ডেলিভারি জানিয়ে দেব। পেমেন্ট নগদ।',
    yourName: 'আপনার নাম', yourPhone: 'ফোন নম্বর', yourAddr: 'ডেলিভারির এলাকা (ঐচ্ছিক)', sendOrder: 'হোয়াটসঅ্যাপে অর্ডার পাঠান', clear: 'কার্ট খালি করুন',
    sendMsg: 'হোয়াটসঅ্যাপে পাঠান', msg: 'বার্তা', phone: 'ফোন',
    heroK: 'মোকামতলা, বগুড়া', heroH: 'বিশ্বাসের ফার্নিচার, <em>আজীবনের জন্য তৈরি।</em>',
    heroP: 'খাট, ডাইনিং সেট, আলমারি, ওয়ার্ডরোব ও অফিস ফার্নিচার, সাথে প্রতিটি ঘর সাজানোর সুন্দর হোম ডেকর। আমাদের শোরুমে এসে সরাসরি দেখে যান।',
    ctaShow: 'শোরুম দেখুন', ctaColl: 'কালেকশন দেখুন', heroTag: 'আমাদের আসল শোরুম ও পণ্যের ছবি',
    t1: 'ভালো মানের বোর্ড', t1d: 'ভিটেক্স, এমডিএফ ও মেলামাইন', t2: 'হোম ডেলিভারি', t2d: 'মোকামতলা উপজেলায়', t3: 'দেখে কিনুন', t3d: 'পুরো শোরুম, তালুকদার মার্কেট', t4: 'সহজ পেমেন্ট', t4d: 'নগদ টাকা',
    shopK: 'ঘর অনুযায়ী কিনুন', shopH: 'ঘর সাজানোর দুই উপায়', shopP: 'প্রতিটি ঘরের জন্য মজবুত ফার্নিচার, আর ঘর পূর্ণ করার ডেকর।',
    tf: 'ফার্নিচার', tfp: 'খাট, ডাইনিং সেট, আলমারি, শোকেস ও অফিস ফার্নিচার।', td: 'হোম ডেকর', tdp: 'ফুলের টব, গাছ, ফুলদানি, ঝুলন্ত বাস্কেট ও দেয়ালের সাজসজ্জা।', shopNow: 'দেখুন',
    featK: 'বাছাই করা', featF: 'আমাদের ফার্নিচার শোরুম থেকে', featD: 'সাজানোর জন্য হোম ডেকর',
    decK: 'হোম ডেকর', decH: 'ছোট ছোট জিনিসেই ঘর সুন্দর', decP: 'টব, গাছ, ফুলদানি, ঝুলন্ত বাস্কেট ও দেয়ালের সাজ। প্রতিটি আমাদের দোকানেই তোলা ছবি, তাই যা দেখছেন তাই পাবেন।', decBtn: 'হোম ডেকর দেখুন',
    vsK: 'ভার্চুয়াল শোরুম', vsH: '৩ডি-তে আমাদের শোরুমে ঘুরে দেখুন', vsP: 'বেডরুম, ড্রয়িং রুম, ডাইনিং রুম, অফিস ও হোম ডেকর ৩ডি-তে ঘুরে দেখুন। মাউস দিয়ে ঘোরান।', vsP2: 'এগুলো উদাহরণ ৩ডি সাজানো, আসবাবের আকৃতি সাধারণ ও মাপ আনুমানিক। আমাদের আসল পণ্যগুলো প্রতিটি রুমের নিচে দেখুন।', vsBtn: 'শোরুমে ঢুকুন',
    galK: 'আমাদের দোকানের ভেতরে', galH: 'সরাসরি এসে দেখে যান', galP: 'এগুলো তালুকদার শোরুমের আসল ছবি।',
    visitK: 'আসুন', visitH: 'তালুকদার মার্কেটে আমাদের খুঁজে নিন',
    fK: 'ফার্নিচার', fH: 'আমাদের ফার্নিচার', fP: 'আমাদের শোরুমের আসল ফার্নিচারের ছবি। বিস্তারিত ও আরও ছবির জন্য যেকোনোটিতে ট্যাপ করুন।',
    dK: 'হোম ডেকর', dH: 'হোম ডেকর', dP: 'প্রতিটি ঘরের জন্য সাজসজ্জা: ফুল, গাছ, ফুলদানি, বাস্কেট ও দেয়ালের সাজ।',
    shopCat: 'ক্যাটাগরি অনুযায়ী দেখুন', collK: 'কালেকশন', collH: 'বাছাই করা কালেকশন', styled: 'আমাদের শোরুমে সাজানো', inq: 'যেকোনো ডেকর সম্পর্কে হোয়াটসঅ্যাপে জিজ্ঞেস করুন',
    decCtaH: 'কোনটা আপনার ঘরে মানাবে বুঝতে পারছেন না?', decCtaP: 'ঘরের ছবি হোয়াটসঅ্যাপে পাঠান, আমরা দোকান থেকে মানানসই জিনিস বেছে দেব।',
    ab: 'আমাদের কথা', abH: 'আপনার বিশ্বস্ত স্থানীয় দোকান', abP1: 'তালুকদার ফার্নিচার অ্যান্ড হোম ডেকর বগুড়ার মোকামতলার তালুকদার মার্কেটে অবস্থিত একটি ফার্নিচার ও হোম ডেকর শোরুম, পরিচালনায় মোঃ জিল্লুল বারী।', abP2: 'আমরা ভিটেক্স, এমডিএফ ও মেলামাইন বোর্ডের ভালো মানের ফার্নিচার এবং সব ঘরের জন্য হোম ডেকর বিক্রি করি। দোকানে এসে দেখে, তুলনা করে কিনুন।', abP3: 'মোকামতলা উপজেলার গ্রাহকদের জন্য হোম ডেলিভারি আছে। পেমেন্ট নগদ।',
    owner: 'স্বত্বাধিকারী', ownerBox: 'পরিচালনায়', deliv: 'হোম ডেলিভারি', delivD: 'মোকামতলা উপজেলায়', pay: 'পেমেন্ট', payD: 'নগদ টাকা', visit: 'শোরুম', visitD: 'তালুকদার মার্কেট, মোকামতলা',
    cK: 'যোগাযোগ', cH: 'আমাদের খুঁজে পাওয়া সহজ', addr: 'ঠিকানা', hrs: 'খোলার সময়', satThu: 'শনিবার থেকে বৃহস্পতিবার', fri: 'শুক্রবার', directions: 'ম্যাপে দেখুন', callUs: 'কল করুন', talk: 'কথা বলুন', fb: 'ফেসবুক পেজ', payNote: 'পেমেন্ট: নগদ। মোকামতলা উপজেলায় হোম ডেলিভারি।',
    fAbout: 'বিশ্বাসের ফার্নিচার, আজীবনের জন্য তৈরি। মোকামতলা, বগুড়ায় মানসম্মত ফার্নিচার ও হোম ডেকর।', fShop: 'কেনাকাটা', fVisit: 'যোগাযোগ', fRights: 'সর্বস্বত্ব সংরক্ষিত।',
    vsPageH: 'ভার্চুয়াল শোরুম', vsPageP: 'একটি রুম বেছে নিয়ে ঘুরে দেখুন। ফ্রেমে টাঙানো ছবিতে ক্লিক করলে পণ্যটি খুলবে।',
    planH: 'রুম প্ল্যানার', planP: 'কেনার আগে ফুটের মাপে ঘরের সাজানো ঠিক করুন। আইটেম টেনে সরান, ঘোরান, আর প্ল্যান আমাদের পাঠান।',
    plRoom: 'ঘরের মাপ (ফুট)', plW: 'প্রস্থ', plL: 'দৈর্ঘ্য', plAdd: 'ফার্নিচার যোগ করুন', plSel: 'নির্বাচিত আইটেম', plRot: '৯০° ঘোরান', plDup: 'কপি করুন', plDel: 'মুছুন', plClr: 'সব মুছুন', plSend: 'হোয়াটসঅ্যাপে প্ল্যান পাঠান', plPng: 'ছবি ডাউনলোড', plItems: 'ঘরের আইটেম',
    plNote: 'আইটেমগুলো সাধারণ মাপের, শুধু ঠিক বসবে কি না দেখার জন্য। এগুলো পণ্যের আসল মাপ নয়। যা কিনতে চান সে অনুযায়ী প্রস্থ ও দৈর্ঘ্য বদলে নিন, আর আসল মাপ আমাদের জিজ্ঞেস করুন।', plHint: 'আইটেম টেনে সরান। ঘোরাতে R, মুছতে Delete চাপুন।',
    waGen: 'আসসালামু আলাইকুম, আমি আপনাদের ফার্নিচার ও হোম ডেকর সম্পর্কে জানতে চাই (তালুকদার ফার্নিচার ওয়েবসাইট)',
    waProd: n => `আসসালামু আলাইকুম, আমি এই পণ্যের দাম ও প্রাপ্যতা জানতে চাই: ${n} (তালুকদার ফার্নিচার ওয়েবসাইট)`
  }
};
let lang = S.defaultLang || 'bn';
try { lang = localStorage.getItem('tfLang') || lang; } catch (e) {}
const t = k => (T[lang][k] != null ? T[lang][k] : T.en[k]);
const L = o => (o && (o[lang] || o.en)) || '';
const wa = txt => `https://wa.me/${S.whatsapp}?text=${encodeURIComponent(txt)}`;
const money = n => 'Tk ' + Number(n).toLocaleString('en-IN');

/* ----------------------------------------------------------- CATALOG */
const catList = g => CATS[g];
const catById = id => { for (const g in CATS) { const c = CATS[g].find(x => x.id === id); if (c) return c; } return null; };
const titleCase = s => s.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim().replace(/\b\w/g, c => c.toUpperCase());
const normGallery = g => (g || []).map(x => typeof x === 'string' ? { src: x, ai: false } : x);
let PRODUCTS = [];
function buildProducts(extraPaths) {
  const list = window.PRODUCTS.map(p => ({
    ...p, tags: p.tags || [], colors: p.colors || [], materials: p.materials || [],
    imgs: [{ src: p.image, ai: !!p.aiNote }, ...normGallery(p.gallery)]
  }));
  /* Photos dropped into assets/furniture/<category>/ or assets/home-decor/<category>/ that are not in the
     catalog yet are shown automatically (name taken from the file name). */
  const known = new Set(list.flatMap(p => p.imgs.map(i => i.src)));
  const re = /^assets\/(furniture|home-decor)\/([^/]+)\/([^/]+)\.(jpe?g|png|webp|avif)$/i;
  const fresh = [...new Set(extraPaths || [])].filter(p => re.test(p) && !known.has(p)).sort();
  const byStem = {};
  list.forEach(p => { byStem[p.image.replace(/\.[^.]+$/, '')] = p; });
  const numRe = /[-_ ]*\(?(\d{1,2})\)?$/;
  fresh.forEach(path => {
    const m = path.match(re), group = m[1] === 'furniture' ? 'furniture' : 'decor', cat = m[2].toLowerCase();
    if (!catById(cat)) return;
    const stem = path.replace(/\.[^.]+$/, '');
    const base = stem.replace(numRe, '');
    if (base !== stem && byStem[base]) { byStem[base].imgs.push({ src: path, ai: /\[ai\]/i.test(path) }); return; }
    const file = decodeURIComponent(m[3]).replace(/\[ai\]/ig, '');
    const parts = file.split('__').map(x => x.trim()).filter(Boolean);
    const en = titleCase(parts[0] || 'New Product');
    const p = { id: 'auto-' + cat + '-' + en.toLowerCase().replace(/[^a-z0-9]+/g, '-'), group, cat, name: { en, bn: parts[1] || en },
      desc: '', image: path, gallery: [], model: null, price: null, colors: [], materials: [], dimensions: '', status: 'ask', tags: [],
      aiNote: /\[ai\]/i.test(path), imgs: [{ src: path, ai: /\[ai\]/i.test(path) }], auto: true };
    list.push(p); byStem[stem] = p;
  });
  PRODUCTS = list;
}
buildProducts(window.DISCOVERED || []);
async function discoverLive() {
  if (!/\.github\.io$/.test(location.hostname)) return false;
  try {
    const c = JSON.parse(sessionStorage.getItem('tfTree') || 'null');
    if (c && Date.now() - c.t < 300000) { buildProducts(c.p); return true; }
  } catch (e) {}
  try {
    const r = await fetch(`https://api.github.com/repos/${S.github.owner}/${S.github.repo}/git/trees/HEAD?recursive=1`);
    if (!r.ok) return false;
    const j = await r.json();
    const paths = (j.tree || []).filter(x => x.type === 'blob').map(x => x.path);
    try { sessionStorage.setItem('tfTree', JSON.stringify({ t: Date.now(), p: paths })); } catch (e) {}
    buildProducts(paths); return true;
  } catch (e) { return false; }
}
const byId = id => PRODUCTS.find(p => p.id === id);
const inGroup = g => PRODUCTS.filter(p => p.group === g);
const inCat = id => PRODUCTS.filter(p => p.cat === id);
const activeCats = g => catList(g).filter(c => inCat(c.id).length);
window.TF = { products: () => PRODUCTS, byId, L, t, wa, lang: () => lang, T, catById, ICON };

/* -------------------------------------------------------------- CART */
const Cart = {
  get() { try { return JSON.parse(localStorage.getItem('tfCart') || '[]'); } catch (e) { return []; } },
  set(c) { try { localStorage.setItem('tfCart', JSON.stringify(c)); } catch (e) {} Cart.badge(); },
  add(id, q = 1) { const c = Cart.get(), x = c.find(i => i.id === id); x ? x.q += q : c.push({ id, q }); Cart.set(c); toast(t('added')); },
  setQ(id, q) { let c = Cart.get(); c = q < 1 ? c.filter(i => i.id !== id) : c.map(i => i.id === id ? { ...i, q } : i); Cart.set(c); },
  count() { return Cart.get().reduce((a, i) => a + i.q, 0); },
  badge() { $$('.cart-badge').forEach(b => { const n = Cart.count(); b.textContent = n || ''; b.dataset.n = n; }); }
};
window.TF.Cart = Cart;
function toast(msg) {
  let el = $('#toast'); if (!el) { el = document.createElement('div'); el.id = 'toast'; el.className = 'toast'; document.body.appendChild(el); }
  el.textContent = msg; el.classList.add('on'); clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove('on'), 1900);
}
window.TF.toast = toast;

/* ----------------------------------------------------------- LAYOUT */
const LOGO = `<svg class="logo-mark" viewBox="0 0 48 48"><rect width="48" height="48" rx="3" fill="#5b3a22"/><path d="M12 33V21c0-1.7 1.3-3 3-3h18c1.700 0 3 1.300 3 3v12M10 33h28M14 33v4M34 33v4M17 18v-3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3" fill="none" stroke="#d9bf8c" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
function isOpen() {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Dhaka', weekday: 'short', hour: 'numeric', hour12: false }).formatToParts(new Date());
  const wd = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[parts.find(p => p.type === 'weekday').value];
  const h = parseInt(parts.find(p => p.type === 'hour').value, 10) % 24, [a, b] = S.hours[wd];
  return h >= a && h < b;
}
const page = document.body.dataset.page || '';
function catLinks(g) {
  const base = g === 'furniture' ? 'furniture.html' : 'home-decor.html';
  return activeCats(g).map(c => `<a href="${base}?cat=${c.id}${g === 'decor' ? '#cat-' + c.id : ''}">${L(c)}<small>${inCat(c.id).length}</small></a>`).join('') + `<a class="all" href="${base}">${t('viewAll')}</a>`;
}
function renderChrome() {
  const open = isOpen();
  const on = k => page === k ? ' class="on"' : '';
  $('#hdr').innerHTML = `
  <div class="topbar"><div class="wrap"><div class="tb-l"><span><i class="dot ${open ? 'on' : ''}"></i>${open ? t('open') : t('closed')}</span><span class="hide-s">${t('topDel')}</span></div>
  <div class="tb-r"><a href="tel:${S.phone}">${S.phoneShow}</a><a href="${wa(t('waGen'))}" target="_blank" rel="noopener">WhatsApp ${S.whatsappShow}</a></div></div></div>
  <header class="site"><div class="wrap">
    <a class="logo" href="index.html" aria-label="${S.name}">${LOGO}<span class="logo-txt"><b>Talukder</b><span>Furniture &amp; Home Decor</span></span></a>
    <nav class="main" aria-label="Main">
      <a href="index.html"${on('home')}>${t('home')}</a>
      <div class="dd"><a href="furniture.html"${on('furniture')}>${t('furniture')}</a><div class="dd-menu">${catLinks('furniture')}</div></div>
      <div class="dd"><a href="home-decor.html"${on('decor')}>${t('decor')}</a><div class="dd-menu">${catLinks('decor')}</div></div>
      <a href="showroom.html"${on('showroom')}>${t('showroom')}</a>
      <a href="room-planner.html"${on('planner')}>${t('planner')}</a>
      <a href="about.html"${on('about')}>${t('about')}</a>
      <a href="contact.html"${on('contact')}>${t('contact')}</a>
    </nav>
    <div class="hd-r">
      <button class="ico-btn s" id="openSearch" aria-label="Search">${ICON.search}</button>
      <a class="ico-btn" href="cart.html" aria-label="Cart">${ICON.cart}<span class="badge cart-badge" data-n="0"></span></a>
      <button class="lang" id="langBtn" aria-label="Language">${lang === 'bn' ? 'English' : 'বাংলা'}</button>
      <button class="ico-btn burger" id="burger" aria-label="Menu">${ICON.menu}</button>
    </div>
  </div></header>
  <div class="drawer" id="drawer"><div class="drawer-in">
    <a href="index.html">${t('home')}</a><a href="furniture.html">${t('furniture')}</a><div class="sub">${activeCats('furniture').map(c => `<a href="furniture.html?cat=${c.id}">${L(c)}</a>`).join('')}</div>
    <a href="home-decor.html">${t('decor')}</a><div class="sub">${activeCats('decor').map(c => `<a href="home-decor.html#cat-${c.id}">${L(c)}</a>`).join('')}</div>
    <a href="showroom.html">${t('showroom')}</a><a href="room-planner.html">${t('planner')}</a><a href="about.html">${t('about')}</a><a href="contact.html">${t('contact')}</a>
    <a href="#" id="drSearch">${lang === 'bn' ? 'খুঁজুন' : 'Search'}</a>
  </div></div>
  <div class="search" id="search"><div class="search-box"><input id="sq" type="search" placeholder="${t('searchPh')}" autocomplete="off"><div class="sr" id="sr"></div></div></div>`;

  $('#ftr').innerHTML = `
  <footer class="site"><div class="wrap">
    <div class="fgrid">
      <div><a class="logo" href="index.html">${LOGO}<span class="logo-txt"><b>Talukder</b><span>Furniture &amp; Home Decor</span></span></a><p class="fabout">${t('fAbout')}</p></div>
      <div><h4>${t('fShop')}</h4><a href="furniture.html">${t('furniture')}</a><a href="home-decor.html">${t('decor')}</a><a href="showroom.html">${t('showroom')}</a><a href="room-planner.html">${t('planner')}</a><a href="cart.html">${t('cartT')}</a></div>
      <div><h4>${t('about')}</h4><a href="about.html">${t('about')}</a><a href="contact.html">${t('contact')}</a><a href="${S.facebook}" target="_blank" rel="noopener">${t('fb')}</a></div>
      <div><h4>${t('fVisit')}</h4><p>${lang === 'bn' ? S.addressBn : S.address}</p><p style="margin-top:10px">${t('satThu')}: 10 AM – 9 PM<br>${t('fri')}: 3 PM – 9 PM</p><a href="tel:${S.phone}">${S.phoneShow}</a><a href="${wa(t('waGen'))}" target="_blank" rel="noopener">WhatsApp ${S.whatsappShow}</a></div>
    </div>
    <div class="fbot"><span>© ${new Date().getFullYear()} ${S.name}. ${t('fRights')}</span><span>Mokamtola, Bogura</span></div>
  </div></footer>
  <a class="float-wa" href="${wa(t('waGen'))}" target="_blank" rel="noopener" aria-label="WhatsApp"><svg viewBox="0 0 24 24" width="28" height="28" fill="#fff"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.2 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.2-.7-2.7-1.1-4.4-3.8-4.6-4-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.8-.1 1.4z"/></svg></a>`;

  $('#langBtn').onclick = () => { lang = lang === 'bn' ? 'en' : 'bn'; try { localStorage.setItem('tfLang', lang); } catch (e) {} renderAll(); };
  const dr = $('#drawer'); $('#burger').onclick = () => dr.classList.add('open');
  dr.onclick = e => { if (e.target === dr || e.target.tagName === 'A' && e.target.id !== 'drSearch') dr.classList.remove('open'); };
  const sr = $('#search'), sq = $('#sq');
  const openS = () => { dr.classList.remove('open'); sr.classList.add('open'); sq.value = ''; $('#sr').innerHTML = ''; setTimeout(() => sq.focus(), 30); };
  $('#openSearch').onclick = openS; $('#drSearch').onclick = e => { e.preventDefault(); openS(); };
  sr.onclick = e => { if (e.target === sr) sr.classList.remove('open'); };
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { sr.classList.remove('open'); dr.classList.remove('open'); } });
  sq.oninput = () => {
    const q = sq.value.trim().toLowerCase(); if (!q) { $('#sr').innerHTML = ''; return; }
    const res = PRODUCTS.filter(p => [p.name.en, p.name.bn, p.desc, L(catById(p.cat)), catById(p.cat).en, ...p.colors].join(' ').toLowerCase().includes(q)).slice(0, 8);
    $('#sr').innerHTML = res.length ? res.map(p => `<a href="product.html?id=${p.id}"><img src="${p.image}" alt=""><span><b>${L(p.name)}</b><small>${L(catById(p.cat))}</small></span></a>`).join('') : `<p>${t('noRes')}</p>`;
  };
  Cart.badge();
  $$('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  $$('[data-i18n-html]').forEach(el => { el.innerHTML = t(el.dataset.i18nHtml); });
  $$('[data-i18n-ph]').forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
  $$('[data-wa]').forEach(a => { a.href = wa(a.dataset.wa === 'gen' ? t('waGen') : a.dataset.wa); a.target = '_blank'; a.rel = 'noopener'; });
  document.body.classList.toggle('bn', lang === 'bn'); document.documentElement.lang = lang;
}

/* -------------------------------------------------------- COMPONENTS */
function fit(img) {
  const r = img.naturalWidth / img.naturalHeight;
  if (r < 0.68 || r > 0.95) img.classList.add('fit');
}
window.TF.fit = fit;
function cardHTML(p) {
  const cat = catById(p.cat);
  const price = p.price ? money(p.price) : t('quote');
  const ai = p.aiNote ? `<span class="ptag ai">${t('aiTag')}</span>` : '';
  return `<article class="pcard rv">
    <a class="ph" href="product.html?id=${p.id}" aria-label="${L(p.name)}"><span class="bk" style="background-image:url('${p.image}')"></span>${ai}
      <img src="${p.image}" alt="${L(p.name)}" loading="lazy" onload="TF.fit(this)"></a>
    <div class="pbody"><span class="pcat">${L(cat)}</span><a class="pname" href="product.html?id=${p.id}">${L(p.name)}</a><span class="pprice">${price}</span>
      <div class="pact"><button class="btn dark" data-add="${p.id}">${ICON.cart}<span>${t('addCart')}</span></button>
      <a class="btn wa ico" href="${wa(t('waProd')(p.name.en))}" target="_blank" rel="noopener" aria-label="${t('inquiry')}">${ICON.wa}</a></div></div></article>`;
}
function fillGrid(el, list, cls) {
  el.className = 'grid ' + (cls || '');
  el.innerHTML = list.length ? list.map(cardHTML).join('') : `<p class="empty" style="grid-column:1/-1">${t('noRes')}</p>`;
  reveal(); bindAdd(el);
}
function bindAdd(root) { $$('[data-add]', root).forEach(b => b.onclick = () => Cart.add(b.dataset.add)); }
function reveal() {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.08 });
  $$('.rv:not(.in)').forEach(el => io.observe(el));
}
/* Lightbox */
let lbList = [], lbI = 0;
function lbOpen(list, i) {
  lbList = list; lbI = i; let el = $('#lb');
  if (!el) {
    el = document.createElement('div'); el.id = 'lb'; el.className = 'lb';
    el.innerHTML = '<button class="lb-x" aria-label="Close">×</button><button class="lb-p" aria-label="Previous">‹</button><button class="lb-n" aria-label="Next">›</button><img alt=""><div class="lb-c"></div>';
    document.body.appendChild(el);
    el.onclick = e => { if (e.target === el || e.target.classList.contains('lb-x')) el.classList.remove('open'); };
    $('.lb-p', el).onclick = () => lbGo(-1); $('.lb-n', el).onclick = () => lbGo(1);
    document.addEventListener('keydown', e => { if (!el.classList.contains('open')) return; if (e.key === 'Escape') el.classList.remove('open'); if (e.key === 'ArrowLeft') lbGo(-1); if (e.key === 'ArrowRight') lbGo(1); });
  }
  lbShow(); el.classList.add('open');
}
function lbGo(d) { lbI = (lbI + d + lbList.length) % lbList.length; lbShow(); }
function lbShow() { const el = $('#lb'), it = lbList[lbI]; $('img', el).src = it.src; $('img', el).alt = it.alt || ''; $('.lb-c', el).textContent = (it.alt || '') + (lbList.length > 1 ? `  ·  ${lbI + 1} / ${lbList.length}` : ''); }
window.TF.lightbox = lbOpen;

/* ------------------------------------------------------------ PAGES */
const pages = {
  home() {
    const slides = [['assets/hero/hero-dining.webp', 'Glass top dining set with carved wooden chairs'], ['assets/hero/hero-sofas.webp', 'Carved sofa set'], ['assets/hero/hero-bed.webp', 'Carved wooden bed with arched headboard']];
    const sl = $('#slides'); sl.innerHTML = slides.map((s, i) => `<div class="slide${i ? '' : ' on'}"><img src="${s[0]}" alt="${s[1]}" ${i ? 'loading="lazy"' : 'fetchpriority="high"'}></div>`).join('');
    const dots = $('#dots'); dots.innerHTML = slides.map((_, i) => `<button class="${i ? '' : 'on'}" aria-label="Slide ${i + 1}"></button>`).join('');
    let cur = 0; const go = n => { cur = n; $$('.slide', sl).forEach((e, i) => e.classList.toggle('on', i === n)); $$('button', dots).forEach((e, i) => e.classList.toggle('on', i === n)); };
    $$('button', dots).forEach((b, i) => b.onclick = () => go(i));
    clearInterval(window._hs); window._hs = setInterval(() => go((cur + 1) % slides.length), 6500);
    $('#trust').innerHTML = [['board','t1'],['truck','t2'],['eye','t3'],['cash','t4']].map(x => `<div>${ICON[x[0]]}<p><b>${t(x[1])}</b><span>${t(x[1] + 'd')}</span></p></div>`).join('');
    fillGrid($('#featF'), inGroup('furniture').filter(p => p.featured).slice(0, 4));
    fillGrid($('#featD'), inGroup('decor').filter(p => p.featured).slice(0, 4));
    const dp = inGroup('decor'); const pick = ['lavender-pot', 'hanging-flower-basket', 'yellow-roses', 'feather-dream-catcher'].map(byId).filter(Boolean);
    $('#decCollage').innerHTML = pick.map(p => `<img src="${p.image}" alt="${L(p.name)}" loading="lazy">`).join('');
    $('#tileF').src = 'assets/showroom/showcase-wide.webp'; $('#tileD').src = (byId('hanging-flower-basket') || dp[0] || {}).image || '';
    const gal = window.SHOWROOM_PHOTOS;
    $('#gal').innerHTML = gal.slice(0, 6).map((g, i) => `<a href="${g.src}" data-i="${i}"><img src="${g.src}" alt="${g.alt}" loading="lazy"></a>`).join('');
    $$('#gal a').forEach(a => a.onclick = e => { e.preventDefault(); lbOpen(gal.map(g => ({ src: g.src, alt: g.alt })), +a.dataset.i); });
    $('#visitAddr').textContent = lang === 'bn' ? S.addressBn : S.address;
  },
  furniture() {
    const params = new URLSearchParams(location.search); let cur = params.get('cat') || 'all', sort = 'feat';
    const cats = activeCats('furniture');
    const draw = () => {
      $('#chips').innerHTML = [`<button class="chip${cur === 'all' ? ' on' : ''}" data-c="all">${t('all')}<small>${inGroup('furniture').length}</small></button>`, ...cats.map(c => `<button class="chip${cur === c.id ? ' on' : ''}" data-c="${c.id}">${L(c)}<small>${inCat(c.id).length}</small></button>`)].join('');
      $$('#chips .chip').forEach(b => b.onclick = () => { cur = b.dataset.c; history.replaceState(null, '', cur === 'all' ? 'furniture.html' : '?cat=' + cur); draw(); });
      let list = cur === 'all' ? inGroup('furniture') : inCat(cur);
      list = [...list]; if (sort === 'az') list.sort((a, b) => L(a.name).localeCompare(L(b.name))); else list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
      fillGrid($('#grid'), list);
    };
    $('#sort').innerHTML = `<option value="feat">${t('sortFeat')}</option><option value="az">${t('sortAZ')}</option>`; $('#sort').value = sort;
    $('#sort').onchange = e => { sort = e.target.value; draw(); };
    draw();
  },
  decor() {
    const cats = activeCats('decor');
    $('#catTiles').innerHTML = cats.map(c => { const ps = inCat(c.id); return `<a class="ctile rv" href="#cat-${c.id}"><div class="ci"><img src="${ps[0].image}" alt="${L(c)}" loading="lazy"></div><b>${L(c)}</b><small>${ps.length} ${ps.length > 1 ? t('products') : t('product')}</small></a>`; }).join('');
    const col = window.COLLECTIONS.map(c => ({ c, ps: PRODUCTS.filter(p => p.tags.includes(c.tag)) })).filter(x => x.ps.length);
    $('#collections').innerHTML = col.map(x => `<div class="decor-sec"><div class="dhead"><div><h3>${L(x.c)}</h3><p class="tip" style="margin:0">${lang === 'bn' ? x.c.bblurb : x.c.blurb}</p></div></div><div class="grid" data-coll="${x.c.tag}"></div></div>`).join('');
    col.forEach(x => fillGrid($(`[data-coll="${x.c.tag}"]`), x.ps.slice(0, 4)));
    $('#catSections').innerHTML = cats.map(c => `<div class="decor-sec" id="cat-${c.id}"><div class="dhead"><div><h3>${L(c)}</h3>${c.tip && lang === 'en' ? `<p class="tip" style="margin:0">${c.tip}</p>` : ''}</div><a class="btn line sm" href="${wa(t('waProd')(c.en))}" target="_blank" rel="noopener">${t('inquiry')}</a></div><div class="grid" data-cat="${c.id}"></div></div>`).join('');
    cats.forEach(c => fillGrid($(`[data-cat="${c.id}"]`), inCat(c.id)));
    const styled = ['assets/showroom/shop-wall.webp', 'assets/showroom/shop-in-2.webp', 'assets/showroom/dressing-corner.webp', 'assets/showroom/shop-in-1.webp'];
    $('#styled').innerHTML = styled.map((s, i) => `<a href="${s}" data-i="${i}"><img src="${s}" alt="Home decor styled in the Talukder showroom" loading="lazy"></a>`).join('');
    $$('#styled a').forEach(a => a.onclick = e => { e.preventDefault(); lbOpen(styled.map(s => ({ src: s, alt: 'Home decor in our showroom' })), +a.dataset.i); });
    if (location.hash) setTimeout(() => { const e = $(location.hash); e && e.scrollIntoView(); }, 60);
  },
  product() {
    const id = new URLSearchParams(location.search).get('id'), p = byId(id), root = $('#pd');
    if (!p) { root.innerHTML = `<div class="empty"><h2>${t('notFound')}</h2><p><a class="btn dark" style="margin-top:20px" href="furniture.html">${t('backTo')}</a></p></div>`; return; }
    document.title = `${p.name.en} | ${S.name}`;
    const cat = catById(p.cat), base = p.group === 'furniture' ? 'furniture.html' : 'home-decor.html';
    $('#crumbs').innerHTML = `<a href="index.html">${t('home')}</a> / <a href="${base}">${t(p.group === 'furniture' ? 'furniture' : 'decor')}</a> / <a href="${base}?cat=${cat.id}">${L(cat)}</a> / ${L(p.name)}`;
    const st = { available: 'st_available', 'made-to-order': 'st_made', ask: 'st_ask' }[p.status] || 'st_ask';
    const rows = [[t('cat'), L(cat)], p.colors.length && [t('colors'), p.colors.map(c => `<span class="sw">${c}</span>`).join('')], p.materials.length && [t('materials'), p.materials.join(', ')],
      p.dimensions && [t('dims'), p.dimensions], [t('avail'), t(st)], cat.tip && lang === 'en' && [t('styling'), cat.tip]].filter(Boolean);
    const hasAi = p.imgs.some(i => i.ai);
    let cur = 0;
    const drawG = () => {
      const im = p.imgs[cur];
      $('#gmain').innerHTML = `<span class="bk" style="background-image:url('${im.src}')"></span>${im.ai ? `<span class="ptag ai">${t('aiTag')}</span>` : ''}<img src="${im.src}" alt="${L(p.name)}">`;
      $$('#thumbs button').forEach((b, i) => b.classList.toggle('on', i === cur));
    };
    root.innerHTML = `<div class="pd-gal"><div class="gal-main" id="gmain"></div><div class="thumbs" id="thumbs">${p.imgs.length > 1 ? p.imgs.map((i, n) => `<button data-n="${n}" aria-label="Photo ${n + 1}"><img src="${i.src}" alt=""></button>`).join('') : ''}</div></div>
    <div class="pd-info"><span class="cat">${L(cat)}</span><h1>${L(p.name)}</h1>${p.desc ? `<p class="desc">${p.desc}</p>` : ''}
      <div class="price-box"><b>${p.price ? money(p.price) : t('quote')}</b><span>${t('priceNote')}</span></div>
      <table class="specs">${rows.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join('')}</table>
      ${hasAi ? `<div class="note ai">${t('aiNote')}</div>` : ''}
      <div id="model"></div>
      <div class="buy"><div class="qty" aria-label="${t('qty')}"><button id="qm">−</button><span id="qv">1</span><button id="qp">+</button></div>
        <button class="btn dark" id="addBtn">${ICON.cart}${t('addCart')}</button>
        <a class="btn wa" target="_blank" rel="noopener" href="${wa(t('waProd')(p.name.en) + '\n' + location.href)}">${ICON.wa}${t('inquiry')}</a></div>
      <p class="note">${t('askSize')}</p></div>`;
    drawG();
    $$('#thumbs button').forEach(b => b.onclick = () => { cur = +b.dataset.n; drawG(); });
    const gm = $('#gmain');
    gm.onmousemove = e => { const r = gm.getBoundingClientRect(); gm.style.setProperty('--zx', ((e.clientX - r.left) / r.width * 100) + '%'); gm.style.setProperty('--zy', ((e.clientY - r.top) / r.height * 100) + '%'); };
    gm.onclick = () => lbOpen(p.imgs.map(i => ({ src: i.src, alt: L(p.name) + (i.ai ? ' (AI design preview)' : '') })), cur);
    let q = 1; $('#qm').onclick = () => { q = Math.max(1, q - 1); $('#qv').textContent = q; }; $('#qp').onclick = () => { q++; $('#qv').textContent = q; };
    $('#addBtn').onclick = () => Cart.add(p.id, q);
    const mb = $('#model');
    if (p.model) {
      if (!customElements.get('model-viewer')) { const s = document.createElement('script'); s.type = 'module'; s.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js'; document.head.appendChild(s); }
      mb.innerHTML = `<div class="model-box"><model-viewer src="${p.model}" camera-controls auto-rotate shadow-intensity="1" alt="3D model of ${p.name.en}"></model-viewer></div><p class="note">${p.modelExact ? t('m3dExact') : t('m3d')}</p>`;
    } else mb.innerHTML = `<p class="note">${t('no3d')}</p>`;
    const rel = [...inCat(p.cat), ...inGroup(p.group)].filter((x, i, a) => x.id !== p.id && a.indexOf(x) === i).slice(0, 4);
    fillGrid($('#related'), rel);
  },
  cart() {
    const root = $('#cartRoot'), c = Cart.get().map(i => ({ ...i, p: byId(i.id) })).filter(i => i.p);
    if (!c.length) { root.innerHTML = `<div class="empty" style="grid-column:1/-1"><h2>${t('cartEmpty')}</h2><p style="margin:10px 0 22px">${t('cartEmptyP')}</p><a class="btn dark" href="furniture.html">${t('continue')}</a></div>`; return; }
    const total = c.reduce((a, i) => a + i.q, 0);
    root.innerHTML = `<div>${c.map(i => `<div class="crow"><a href="product.html?id=${i.p.id}"><img src="${i.p.image}" alt="${L(i.p.name)}"></a>
      <div><span class="pcat">${L(catById(i.p.cat))}</span><h4><a href="product.html?id=${i.p.id}">${L(i.p.name)}</a></h4><span class="pprice">${i.p.price ? money(i.p.price) : t('quote')}</span><br><button class="rm" data-rm="${i.p.id}">${t('remove')}</button></div>
      <div class="qcol"><div class="qty"><button data-m="${i.p.id}">−</button><span>${i.q}</span><button data-p="${i.p.id}">+</button></div></div></div>`).join('')}</div>
      <aside class="card sum"><h3>${t('summary')}</h3><div class="row"><span>${t('sumItems')}</span><b>${total}</b></div><p class="note" style="margin:16px 0">${t('cartHow')}</p>
      <div class="form"><label>${t('yourName')}</label><input id="cn"><label>${t('yourPhone')}</label><input id="cp" inputmode="tel"><label>${t('yourAddr')}</label><input id="ca"></div>
      <a class="btn wa" id="send" style="width:100%;margin-top:18px" target="_blank" rel="noopener">${ICON.wa}${t('sendOrder')}</a>
      <button class="btn line sm" id="clr" style="width:100%;margin-top:10px">${t('clear')}</button></aside>`;
    $$('[data-rm]').forEach(b => b.onclick = () => { Cart.setQ(b.dataset.rm, 0); pages.cart(); });
    $$('[data-m]').forEach(b => b.onclick = () => { Cart.setQ(b.dataset.m, Cart.get().find(i => i.id === b.dataset.m).q - 1); pages.cart(); });
    $$('[data-p]').forEach(b => b.onclick = () => { Cart.setQ(b.dataset.p, Cart.get().find(i => i.id === b.dataset.p).q + 1); pages.cart(); });
    $('#clr').onclick = () => { Cart.set([]); pages.cart(); };
    const upd = () => {
      const lines = c.map((i, n) => `${n + 1}. ${i.p.name.en} x ${i.q}`).join('\n');
      const msg = `Assalamu alaikum, I want to order / ask the price of these items from the Talukder Furniture website:\n${lines}\n\nName: ${$('#cn').value}\nPhone: ${$('#cp').value}\nDelivery area: ${$('#ca').value}`;
      $('#send').href = wa(msg);
    };
    $$('#cn,#cp,#ca').forEach(i => i.oninput = upd); upd();
  },
  contact() {
    $('#addrV').textContent = lang === 'bn' ? S.addressBn : S.address;
    const f = $('#cf'); const upd = () => { $('#cfSend').href = wa(`Assalamu alaikum, ${$('#cfm').value || t('waGen')}\n\nName: ${$('#cfn').value}\nPhone: ${$('#cfp').value}`); };
    $$('#cfn,#cfp,#cfm').forEach(i => i.oninput = upd); upd();
  },
  about() {}
};

function renderAll() {
  renderChrome();
  if (pages[page]) pages[page]();
  reveal();
  const yr = $('#yr'); if (yr) yr.textContent = new Date().getFullYear();
  document.dispatchEvent(new Event('tf:render'));
}
renderAll();
discoverLive().then(ok => { if (ok) renderAll(); });
})();
