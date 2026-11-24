/* ==========================================================================
   TALUKDER FURNITURE & HOME DECOR  |  PRODUCT CATALOG
   --------------------------------------------------------------------------
   This is the ONE file that controls every product on the website.
   Add a product = add one block to PRODUCTS below. No other file needs to change.

   FIELDS (copy an existing product and change the values)
     id           unique short name, lowercase, no spaces      "carved-wooden-bed"
     name         { en: "English name", bn: "বাংলা নাম" }
     group        "furniture" or "decor"
     cat          category id (must exist in CATEGORIES below)
     desc         short description of what the photo shows
     image        main photo path
     gallery      more photos of the SAME product (optional)  [ "assets/.../2.webp" ]
     model        path to a .glb 3D model (optional)          "assets/models/bed.glb"
     price        number in BDT, or null = "Request a Quote"
     colors       ["Dark brown"]            leave [] if not known
     materials    ["Melamine board"]        leave [] if not known
     dimensions   "6 ft x 7 ft"             leave "" if not known
     status       "available" | "made-to-order" | "ask"   (ask = confirm on WhatsApp)
     featured     true = shown on the home page
     tags         ["lavender"]              used for collections on the Home Decor page
     aiNote       true if the MAIN photo is an AI preview, not a real item

   RULE: only add products the shop really sells. Photos must be real photos of the
   actual item. Never put a stock photo here.
   ========================================================================== */

window.CATEGORIES = {
  furniture: [
    { id: 'beds',      en: 'Beds',                 bn: 'খাট' },
    { id: 'sofas',     en: 'Sofas',                bn: 'সোফা' },
    { id: 'dining',    en: 'Dining Sets',          bn: 'ডাইনিং সেট' },
    { id: 'tables',    en: 'Tables',               bn: 'টেবিল' },
    { id: 'chairs',    en: 'Chairs',               bn: 'চেয়ার' },
    { id: 'wardrobes', en: 'Wardrobes & Almirahs', bn: 'ওয়ার্ডরোব ও আলমারি' },
    { id: 'showcases', en: 'Showcases',            bn: 'শোকেস' },
    { id: 'office',    en: 'Office & Study',       bn: 'অফিস ও স্টাডি' },
    { id: 'storage',   en: 'Bedside & Storage',    bn: 'বেডসাইড ও স্টোরেজ' }
  ],
  decor: [
    { id: 'flower-pots',     en: 'Flower Pots',              bn: 'ফুলের টব',
      tip: 'Group two or three pots of different heights on a console, shelf or side table.' },
    { id: 'plants',          en: 'Indoor & Artificial Plants', bn: 'গাছ ও সবুজ সাজ',
      tip: 'Greenery brings life to a bright corner, an office desk or beside a TV unit.' },
    { id: 'hanging-baskets', en: 'Hanging Baskets',          bn: 'ঝুলন্ত বাস্কেট',
      tip: 'Hang near a window or in a corner to add height without using floor space.' },
    { id: 'vases',           en: 'Decorative Vases',         bn: 'ফুলদানি',
      tip: 'A tall vase suits a dining table or entrance; a pair looks good on a showcase.' },
    { id: 'flowers',         en: 'Decorative Flowers',       bn: 'সাজানোর ফুল',
      tip: 'Place in a vase of your own, or ask us which vase matches best.' },
    { id: 'wall-decor',      en: 'Wall Decor',               bn: 'দেয়ালের সাজসজ্জা',
      tip: 'Mix a mirror, a shelf and a hanging piece on one wall for a styled look.' },
    { id: 'table-decor',     en: 'Table Decor',              bn: 'টেবিল ডেকর' },
    { id: 'accessories',     en: 'Decorative Accessories',   bn: 'ডেকোরেটিভ এক্সেসরিজ' },
    { id: 'styling',         en: 'Home Styling Items',       bn: 'হোম স্টাইলিং আইটেম' }
  ]
};

/* Collections shown on the Home Decor page. A product joins a collection through its tags. */
window.COLLECTIONS = [
  { tag: 'lavender', en: 'The Lavender Collection', bn: 'ল্যাভেন্ডার কালেকশন',
    blurb: 'Soft purple lavender in pots and vases.', bblurb: 'পাত্রে ও ফুলদানিতে নরম বেগুনি ল্যাভেন্ডার।' },
  { tag: 'hanging-greens', en: 'Hanging Greens', bn: 'ঝুলন্ত সবুজ',
    blurb: 'Trailing greenery that lifts a room.', bblurb: 'ঘরকে প্রাণবন্ত করা ঝুলন্ত লতা।' },
  { tag: 'wall-statement', en: 'Wall Statement Pieces', bn: 'দেয়ালের আকর্ষণ',
    blurb: 'Mirrors, shelves and hand-finished wall pieces.', bblurb: 'আয়না, শেলফ ও হাতে তৈরি দেয়ালের সাজ।' }
];

window.PRODUCTS = [
  /* ============================ FURNITURE ============================ */
  { id: 'carved-wooden-bed', group: 'furniture', cat: 'beds', featured: true,
    name: { en: 'Carved Wooden Bed', bn: 'নকশা করা কাঠের খাট' },
    desc: 'Bed with a decorative carved headboard and patterned panel inserts, in a warm honey-brown finish.',
    image: 'assets/furniture/beds/carved-wooden-bed.webp', gallery: [], model: null,
    price: null, colors: ['Honey brown'], materials: [], dimensions: '', status: 'ask' },

  { id: 'bedside-drawers', group: 'furniture', cat: 'storage',
    name: { en: 'Bedside Drawers', bn: 'বেডসাইড ড্রয়ার' },
    desc: 'A pair of bedside tables, two drawers each, in a dark mahogany-style finish.',
    image: 'assets/furniture/storage/bedside-drawers.webp', gallery: [], model: null,
    price: null, colors: ['Dark brown'], materials: [], dimensions: '', status: 'ask' },

  { id: 'glass-top-dining-set', group: 'furniture', cat: 'dining', featured: true,
    name: { en: 'Glass Top Dining Set', bn: 'গ্লাস টপ ডাইনিং সেট' },
    desc: 'Dining table with a glass top and etched centre detail, shown with matching wooden chairs.',
    image: 'assets/furniture/dining/glass-top-dining-set.webp', gallery: [], model: null,
    price: null, colors: ['Clear glass', 'Dark brown'], materials: ['Glass top'], dimensions: '', status: 'ask' },

  { id: 'wooden-dining-table-set', group: 'furniture', cat: 'dining',
    name: { en: 'Wooden Dining Table Set', bn: 'কাঠের ডাইনিং টেবিল সেট' },
    desc: 'Wooden dining table with chairs, as displayed in our showroom.',
    image: 'assets/furniture/dining/wooden-dining-table-set.webp', gallery: [], model: null,
    price: null, colors: ['Brown'], materials: [], dimensions: '', status: 'ask' },

  { id: 'almirah-with-mirror', group: 'furniture', cat: 'wardrobes', featured: true,
    name: { en: 'Almirah with Mirror', bn: 'আয়নাসহ আলমারি' },
    desc: 'Almirah with a full-length mirror door, a glass-door section and carved top panels.',
    image: 'assets/furniture/wardrobes/almirah-with-mirror.webp', gallery: [], model: null,
    price: null, colors: ['Dark brown'], materials: [], dimensions: '', status: 'ask' },

  { id: 'three-door-wardrobe', group: 'furniture', cat: 'wardrobes', featured: true,
    name: { en: '3-Door Wardrobe', bn: '৩ দরজার ওয়ার্ডরোব' },
    desc: 'Three-door wardrobe with a geometric panel pattern across the doors, in a dark brown finish.',
    image: 'assets/furniture/wardrobes/three-door-wardrobe.webp',
    gallery: [], model: null,
    price: null, colors: ['Dark brown'], materials: [], dimensions: '', status: 'ask' },

  { id: 'carved-showcase-cabinet', group: 'furniture', cat: 'showcases', featured: true,
    name: { en: 'Carved Showcase Cabinet', bn: 'নকশা করা শোকেস কেবিনেট' },
    desc: 'Display cabinet with arched glass doors, carved detailing and open shelves, in warm brown wood tones.',
    image: 'assets/furniture/showcases/carved-showcase-cabinet.webp', gallery: [], model: null,
    price: null, colors: ['Warm brown'], materials: [], dimensions: '', status: 'ask' },

  { id: 'glass-door-showcase', group: 'furniture', cat: 'showcases',
    name: { en: 'Glass Door Showcase', bn: 'কাচের দরজার শোকেস' },
    desc: 'Tall display cabinet with glass doors and inner shelves, dark brown frame.',
    image: 'assets/furniture/showcases/glass-door-showcase.webp', gallery: [], model: null,
    price: null, colors: ['Dark brown'], materials: ['Glass doors'], dimensions: '', status: 'ask' },

  { id: 'study-table-with-shelf', group: 'furniture', cat: 'office', featured: true,
    name: { en: 'Study Table with Shelf', bn: 'শেলফসহ স্টাডি টেবিল' },
    desc: 'Study table with an upper shelf unit and drawers, in a dark brown finish.',
    image: 'assets/furniture/office/study-table-with-shelf.webp',
    gallery: [], model: null,
    price: null, colors: ['Dark brown'], materials: [], dimensions: '', status: 'ask' },

  { id: 'office-chairs', group: 'furniture', cat: 'office',
    name: { en: 'Office Chairs', bn: 'অফিস চেয়ার' },
    desc: 'Black cushioned office chairs on swivel bases.',
    image: 'assets/furniture/office/office-chairs.webp', gallery: [], model: null,
    price: null, colors: ['Black'], materials: [], dimensions: '', status: 'ask' },

  /* --- Added from the shop's product photos --- */
  { id: 'arched-headboard-carved-bed', group: 'furniture', cat: 'beds', featured: true,
    name: { en: 'Carved Bed with Arched Headboard', bn: 'নকশা করা খাট (আর্চ হেডবোর্ড)' },
    desc: 'Bed with an arched headboard, carved scroll panels and a matching footboard, in a deep red-brown finish.',
    image: 'assets/furniture/beds/arched-headboard-carved-bed.webp', gallery: [], model: null,
    price: null, colors: ['Red brown'], materials: [], dimensions: '', status: 'ask' },

  { id: 'three-piece-sofa-set', group: 'furniture', cat: 'sofas', featured: true,
    name: { en: '3-Piece Carved Sofa Set', bn: '৩-পিস নকশা করা সোফা সেট' },
    desc: 'Sofa set with dark carved wooden arms and soft pink and grey upholstery: a three-seater, a two-seater and an armchair.',
    image: 'assets/furniture/sofas/three-piece-sofa-set.webp', gallery: [], model: null,
    price: null, colors: ['Pink', 'Grey', 'Dark brown'], materials: [], dimensions: '', status: 'ask' },

  { id: 'carved-arm-sofa', group: 'furniture', cat: 'sofas',
    name: { en: 'Carved Arm Sofa', bn: 'নকশা করা হাতলের সোফা' },
    desc: 'Two-seater sofa with turned wooden arm rails, carved side panels and pink and grey cushions.',
    image: 'assets/furniture/sofas/carved-arm-sofa.webp', gallery: [], model: null,
    price: null, colors: ['Pink', 'Grey', 'Dark brown'], materials: [], dimensions: '', status: 'ask' },

  { id: 'six-chair-glass-dining-set', group: 'furniture', cat: 'dining', featured: true,
    name: { en: 'Glass Top 6-Chair Dining Set', bn: 'গ্লাস টপ ৬ চেয়ারের ডাইনিং সেট' },
    desc: 'Glass-top dining table with six dark wooden chairs that have cut-out backs.',
    image: 'assets/furniture/dining/six-chair-glass-dining-set.webp', gallery: [], model: null, aiNote: true,
    price: null, colors: ['Dark brown', 'Clear glass'], materials: [], dimensions: '', status: 'ask' },

  { id: 'geometric-three-door-wardrobe', group: 'furniture', cat: 'wardrobes',
    name: { en: 'Geometric Panel 3-Door Wardrobe', bn: 'জ্যামিতিক নকশার ৩ দরজার ওয়ার্ডরোব' },
    desc: 'Three-door wardrobe with a geometric line pattern and ribbed panels, with a curved top, in dark walnut tone.',
    image: 'assets/furniture/wardrobes/geometric-three-door-wardrobe.webp', gallery: [], model: null, aiNote: true,
    price: null, colors: ['Dark walnut'], materials: [], dimensions: '', status: 'ask' },

  { id: 'scrollwork-two-door-wardrobe', group: 'furniture', cat: 'wardrobes', featured: true,
    name: { en: 'Two-Door Scrollwork Wardrobe', bn: 'স্ক্রলওয়ার্ক নকশার ২ দরজার ওয়ার্ডরোব' },
    desc: 'Two-door wardrobe with scrollwork panels at the top and bottom of each door, vertical slats and lockable handles.',
    image: 'assets/furniture/wardrobes/scrollwork-two-door-wardrobe.webp', gallery: [], model: null,
    price: null, colors: ['Brown', 'Black accents'], materials: [], dimensions: '', status: 'ask' },

  { id: 'carved-band-three-door-wardrobe', group: 'furniture', cat: 'wardrobes',
    name: { en: '3-Door Carved Band Wardrobe', bn: 'নকশার পট্টিসহ ৩ দরজার ওয়ার্ডরোব' },
    desc: 'Three-door wardrobe with a carved pattern band across the doors, in a red-brown wood-grain finish.',
    image: 'assets/furniture/wardrobes/carved-band-three-door-wardrobe.webp', gallery: [], model: null,
    price: null, colors: ['Red brown'], materials: [], dimensions: '', status: 'ask' },

  { id: 'open-hanging-rack-unit', group: 'furniture', cat: 'wardrobes',
    name: { en: 'Open Hanging Rack Unit', bn: 'খোলা হ্যাংগিং র‍্যাক ইউনিট' },
    desc: 'Open wardrobe unit with metal hanging rails, shelves and a small lower cupboard.',
    image: 'assets/furniture/wardrobes/open-hanging-rack-unit.webp', gallery: [], model: null,
    price: null, colors: ['Honey brown'], materials: [], dimensions: '', status: 'ask' },

  { id: 'carved-chest-with-cupboard', group: 'furniture', cat: 'storage',
    name: { en: 'Carved Chest with Cupboard', bn: 'নকশা করা ড্রয়ার ও আলমারি' },
    desc: 'Chest of drawers with a side cupboard and a carved pattern band on the top drawer and each drawer front.',
    image: 'assets/furniture/storage/carved-chest-with-cupboard.webp', gallery: [], model: null,
    price: null, colors: ['Brown', 'Black accents'], materials: [], dimensions: '', status: 'ask' },

  { id: 'carved-chest-cabinet', group: 'furniture', cat: 'storage',
    name: { en: 'Carved Chest Cabinet', bn: 'নকশা করা চেস্ট কেবিনেট' },
    desc: 'Cabinet with carved drawers, a lockable side door and a glossy dark brown finish.',
    image: 'assets/furniture/storage/carved-chest-cabinet.webp', gallery: [], model: null,
    price: null, colors: ['Dark brown'], materials: [], dimensions: '', status: 'ask' },

  { id: 'five-drawer-chest', group: 'furniture', cat: 'storage',
    name: { en: 'Five-Drawer Chest', bn: 'পাঁচ ড্রয়ারের চেস্ট' },
    desc: 'Tall chest with five drawers, diamond-pattern fronts and metal handles.',
    image: 'assets/furniture/storage/five-drawer-chest.webp', gallery: [], model: null,
    price: null, colors: ['Brown'], materials: [], dimensions: '', status: 'ask' },

  { id: 'two-door-cabinet-with-drawer', group: 'furniture', cat: 'storage',
    name: { en: 'Two-Door Cabinet with Drawer', bn: 'ড্রয়ারসহ ২ দরজার কেবিনেট' },
    desc: 'Cabinet with a lockable drawer, two doors with bar handles and a wood-grain laminate finish.',
    image: 'assets/furniture/storage/two-door-cabinet-with-drawer.webp', gallery: [], model: null,
    price: null, colors: ['Honey brown'], materials: [], dimensions: '', status: 'ask' },

  { id: 'executive-study-desk', group: 'furniture', cat: 'office', featured: true,
    name: { en: 'Executive Study Desk with Hutch', bn: 'হাচসহ এক্সিকিউটিভ স্টাডি ডেস্ক' },
    desc: 'Dark mahogany desk with an upper shelf hutch, a lockable cupboard, a pull-out keyboard tray and a drawer.',
    image: 'assets/furniture/office/executive-study-desk.webp', gallery: [], model: null, aiNote: true,
    price: null, colors: ['Dark mahogany'], materials: [], dimensions: '', status: 'ask' },

  { id: 'study-table-with-side-cabinet', group: 'furniture', cat: 'office',
    name: { en: 'Study Table with Side Cabinet', bn: 'সাইড কেবিনেটসহ স্টাডি টেবিল' },
    desc: 'Study table with a tall lockable side cabinet, a glass shelf unit and a drawer.',
    image: 'assets/furniture/office/study-table-with-side-cabinet.webp', gallery: [], model: null,
    price: null, colors: ['Honey brown', 'White'], materials: [], dimensions: '', status: 'ask' },

  /* ============================ HOME DECOR ============================ */
  /* --- Flower Pots --- */
  { id: 'lavender-pot', group: 'decor', cat: 'flower-pots', featured: true, tags: ['lavender'],
    name: { en: 'Lavender Pot', bn: 'ল্যাভেন্ডার টব' },
    desc: 'Full bunch of purple lavender in a light-blue textured pot.',
    image: 'assets/home-decor/flower-pots/lavender-pot.webp', gallery: [], model: null,
    price: null, colors: ['Purple', 'Light blue'], materials: [], dimensions: '', status: 'ask' },
  { id: 'lavender-planter', group: 'decor', cat: 'flower-pots', tags: ['lavender'],
    name: { en: 'Lavender Planter', bn: 'ল্যাভেন্ডার প্ল্যান্টার' },
    desc: 'Lavender stems with green leaves in a pale pink planter.',
    image: 'assets/home-decor/flower-pots/lavender-planter.webp', gallery: [], model: null,
    price: null, colors: ['Purple', 'Pale pink'], materials: [], dimensions: '', status: 'ask' },
  { id: 'blue-clematis', group: 'decor', cat: 'flower-pots',
    name: { en: 'Blue Clematis', bn: 'নীল ফুলের টব' },
    desc: 'Large blue clematis-style blooms with green leaves in a small pot.',
    image: 'assets/home-decor/flower-pots/blue-clematis.webp', gallery: [], model: null,
    price: null, colors: ['Blue'], materials: [], dimensions: '', status: 'ask' },
  { id: 'pink-flower-pot', group: 'decor', cat: 'flower-pots',
    name: { en: 'Pink Flower Pot', bn: 'গোলাপি ফুলের টব' },
    desc: 'Small pink flowers in a ribbed pink pot tied with a white bow.',
    image: 'assets/home-decor/flower-pots/pink-flower-pot.webp', gallery: [], model: null,
    price: null, colors: ['Pink'], materials: [], dimensions: '', status: 'ask' },
  { id: 'red-blossoms', group: 'decor', cat: 'flower-pots', featured: true,
    name: { en: 'Red Blossoms', bn: 'লাল ফুলের টব' },
    desc: 'Dense red daisy-style blossoms in a gold-toned bowl.',
    image: 'assets/home-decor/flower-pots/red-blossoms.webp', gallery: [], model: null,
    price: null, colors: ['Red', 'Gold'], materials: [], dimensions: '', status: 'ask' },
  { id: 'sunflower-pot', group: 'decor', cat: 'flower-pots',
    name: { en: 'Sunflower Pot', bn: 'সূর্যমুখী টব' },
    desc: 'Three pink-toned sunflowers in a dark pot.',
    image: 'assets/home-decor/flower-pots/sunflower-pot.webp', gallery: [], model: null,
    price: null, colors: ['Pink', 'Dark grey'], materials: [], dimensions: '', status: 'ask' },
  { id: 'yellow-flower-pot', group: 'decor', cat: 'flower-pots',
    name: { en: 'Yellow Flower Pot', bn: 'হলুদ ফুলের টব' },
    desc: 'Yellow lilies with green leaves in a white textured pot.',
    image: 'assets/home-decor/flower-pots/yellow-flower-pot.webp', gallery: [], model: null,
    price: null, colors: ['Yellow', 'White'], materials: [], dimensions: '', status: 'ask' },
  { id: 'yellow-roses', group: 'decor', cat: 'flower-pots', featured: true,
    name: { en: 'Yellow Roses', bn: 'হলুদ গোলাপ' },
    desc: 'Full arrangement of soft yellow roses in a black pot with a gold rim.',
    image: 'assets/home-decor/flower-pots/yellow-roses.webp', gallery: [], model: null,
    price: null, colors: ['Yellow', 'Black'], materials: [], dimensions: '', status: 'ask' },
  { id: 'purple-roses', group: 'decor', cat: 'flower-pots',
    name: { en: 'Purple Roses', bn: 'বেগুনি গোলাপ' },
    desc: 'Lilac roses with small white filler flowers in a woven-look brown pot.',
    image: 'assets/home-decor/flower-pots/purple-roses.webp', gallery: [], model: null,
    price: null, colors: ['Lilac', 'Brown'], materials: [], dimensions: '', status: 'ask' },

  /* --- Plants --- */
  { id: 'aloe-plant', group: 'decor', cat: 'plants',
    name: { en: 'Aloe Plant', bn: 'অ্যালো প্ল্যান্ট' },
    desc: 'Aloe-style plant in a white pot with a side handle.',
    image: 'assets/home-decor/plants/aloe-plant.webp', gallery: [], model: null,
    price: null, colors: ['Green', 'White'], materials: [], dimensions: '', status: 'ask' },
  { id: 'green-pothos-pot', group: 'decor', cat: 'plants', featured: true,
    name: { en: 'Green Pothos Pot', bn: 'মানিপ্ল্যান্ট টব' },
    desc: 'Trailing money-plant leaves in a dark wood-look pot.',
    image: 'assets/home-decor/plants/green-pothos-pot.webp', gallery: [], model: null,
    price: null, colors: ['Green', 'Dark grey'], materials: [], dimensions: '', status: 'ask' },
  { id: 'palm-plant', group: 'decor', cat: 'plants',
    name: { en: 'Palm Plant', bn: 'পাম গাছ' },
    desc: 'Small palm in a white pot with a side handle.',
    image: 'assets/home-decor/plants/palm-plant.webp', gallery: [], model: null,
    price: null, colors: ['Green', 'White'], materials: [], dimensions: '', status: 'ask' },
  { id: 'succulent-pot', group: 'decor', cat: 'plants',
    name: { en: 'Succulent Pot', bn: 'সাকুলেন্ট টব' },
    desc: 'Rosette succulent in a white pot with a side handle.',
    image: 'assets/home-decor/plants/succulent-pot.webp', gallery: [], model: null,
    price: null, colors: ['Green', 'White'], materials: [], dimensions: '', status: 'ask' },
  { id: 'greenery-arrangement', group: 'decor', cat: 'plants',
    name: { en: 'Greenery Arrangement', bn: 'সবুজ সাজসজ্জা' },
    desc: 'Tall grass-style foliage with trailing ivy in a white pot.',
    image: 'assets/home-decor/plants/greenery-arrangement.webp', gallery: [], model: null,
    price: null, colors: ['Green', 'White'], materials: [], dimensions: '', status: 'ask' },

  /* --- Hanging Baskets --- */
  { id: 'hanging-basket', group: 'decor', cat: 'hanging-baskets', tags: ['hanging-greens'],
    name: { en: 'Hanging Basket', bn: 'ঝুলন্ত বাস্কেট' },
    desc: 'Woven basket on red hanging cords with long trailing green vines.',
    image: 'assets/home-decor/hanging-baskets/hanging-basket.webp', gallery: [], model: null,
    price: null, colors: ['Green', 'Brown', 'Red cord'], materials: [], dimensions: '', status: 'ask' },
  { id: 'hanging-flower-basket', group: 'decor', cat: 'hanging-baskets', featured: true, tags: ['hanging-greens'],
    name: { en: 'Hanging Flower Basket', bn: 'ঝুলন্ত ফুলের বাস্কেট' },
    desc: 'Woven basket with peach-pink flowers and trailing green leaves.',
    image: 'assets/home-decor/hanging-baskets/hanging-flower-basket.webp', gallery: [], model: null,
    price: null, colors: ['Peach', 'Green', 'Brown'], materials: [], dimensions: '', status: 'ask' },
  { id: 'hanging-greenery', group: 'decor', cat: 'hanging-baskets', tags: ['hanging-greens'],
    name: { en: 'Hanging Greenery', bn: 'ঝুলন্ত সবুজ লতা' },
    desc: 'Round woven basket with long cascading green leaves.',
    image: 'assets/home-decor/hanging-baskets/hanging-greenery.webp', gallery: [], model: null,
    price: null, colors: ['Green', 'Brown'], materials: [], dimensions: '', status: 'ask' },

  /* --- Vases --- */
  { id: 'lavender-vase', group: 'decor', cat: 'vases', tags: ['lavender'],
    name: { en: 'Lavender Vase', bn: 'ল্যাভেন্ডার ফুলদানি' },
    desc: 'Tall lavender stems in a slim pink glazed vase.',
    image: 'assets/home-decor/vases/lavender-vase.webp', gallery: [], model: null,
    price: null, colors: ['Purple', 'Pink'], materials: [], dimensions: '', status: 'ask' },
  { id: 'tulip-vase', group: 'decor', cat: 'vases',
    name: { en: 'Tulip Vase', bn: 'টিউলিপ ফুলদানি' },
    desc: 'Single purple tulip in a blue and white swirled vase.',
    image: 'assets/home-decor/vases/tulip-vase.webp', gallery: [], model: null,
    price: null, colors: ['Purple', 'Blue'], materials: [], dimensions: '', status: 'ask' },
  { id: 'tulips-in-vase', group: 'decor', cat: 'vases',
    name: { en: 'Tulips in Vase', bn: 'টিউলিপ ফুলদানি (জোড়া)' },
    desc: 'Two purple tulips in a dark marbled vase.',
    image: 'assets/home-decor/vases/tulips-in-vase.webp', gallery: [], model: null,
    price: null, colors: ['Purple', 'Dark marble'], materials: [], dimensions: '', status: 'ask' },
  { id: 'ceramic-vases', group: 'decor', cat: 'vases',
    name: { en: 'Ceramic Vases', bn: 'সিরামিক ফুলদানি' },
    desc: 'White ceramic vases with a hand-painted floral design and an open centre.',
    image: 'assets/home-decor/vases/ceramic-vases.webp', gallery: [], model: null,
    price: null, colors: ['White', 'Pink floral'], materials: ['Ceramic'], dimensions: '', status: 'ask' },

  /* --- Decorative Flowers --- */
  { id: 'pink-lily', group: 'decor', cat: 'flowers',
    name: { en: 'Pink Lily', bn: 'গোলাপি লিলি' },
    desc: 'Large pink lily blooms with a green leaf.',
    image: 'assets/home-decor/flowers/pink-lily.webp', gallery: [], model: null,
    price: null, colors: ['Pink'], materials: [], dimensions: '', status: 'ask' },
  { id: 'white-lily', group: 'decor', cat: 'flowers',
    name: { en: 'White Lily', bn: 'সাদা লিলি' },
    desc: 'White lily blooms with yellow centres and green leaves.',
    image: 'assets/home-decor/flowers/white-lily.webp', gallery: [], model: null,
    price: null, colors: ['White'], materials: [], dimensions: '', status: 'ask' },
  { id: 'pink-cosmos', group: 'decor', cat: 'flowers',
    name: { en: 'Pink Cosmos', bn: 'গোলাপি কসমস' },
    desc: 'Pink-purple cosmos flowers on long green stems.',
    image: 'assets/home-decor/flowers/pink-cosmos.webp', gallery: [], model: null,
    price: null, colors: ['Pink', 'Purple'], materials: [], dimensions: '', status: 'ask' },
  { id: 'red-cosmos', group: 'decor', cat: 'flowers',
    name: { en: 'Red Cosmos', bn: 'লাল কসমস' },
    desc: 'Deep red cosmos flowers with feathery green filler.',
    image: 'assets/home-decor/flowers/red-cosmos.webp', gallery: [], model: null,
    price: null, colors: ['Red'], materials: [], dimensions: '', status: 'ask' },

  /* --- Wall Decor --- */
  { id: 'decorative-wall-mirror', group: 'decor', cat: 'wall-decor', tags: ['wall-statement'],
    name: { en: 'Decorative Wall Mirror', bn: 'ডেকোরেটিভ আয়না' },
    desc: 'Round mirror in a cream rope-wrapped frame with handmade flowers.',
    image: 'assets/home-decor/wall-decor/decorative-wall-mirror.webp', gallery: [], model: null,
    price: null, colors: ['Cream', 'Multicolour flowers'], materials: [], dimensions: '', status: 'ask' },
  { id: 'floral-wall-mirror', group: 'decor', cat: 'wall-decor', tags: ['wall-statement'],
    name: { en: 'Floral Wall Mirror', bn: 'ফুলের আয়না' },
    desc: 'Round woven-frame wall piece with red and yellow flowers and a small flower pot detail.',
    image: 'assets/home-decor/wall-decor/floral-wall-mirror.webp', gallery: [], model: null,
    price: null, colors: ['Natural', 'Red', 'Yellow'], materials: [], dimensions: '', status: 'ask' },
  { id: 'feather-dream-catcher', group: 'decor', cat: 'wall-decor', featured: true, tags: ['wall-statement'],
    name: { en: 'Feather Dream Catcher', bn: 'ড্রিম ক্যাচার' },
    desc: 'Hanging dream catcher with teal feathers and a colourful woven ring.',
    image: 'assets/home-decor/wall-decor/feather-dream-catcher.webp', gallery: [], model: null,
    price: null, colors: ['Teal', 'Yellow', 'Red'], materials: [], dimensions: '', status: 'ask' },
  { id: 'jute-wall-pocket', group: 'decor', cat: 'wall-decor', tags: ['wall-statement'],
    name: { en: 'Jute Wall Pocket', bn: 'পাটের ওয়াল পকেট' },
    desc: 'Cone-shaped wall pocket with a natural jute finish.',
    image: 'assets/home-decor/wall-decor/jute-wall-pocket.webp', gallery: [], model: null,
    price: null, colors: ['Natural jute'], materials: ['Jute'], dimensions: '', status: 'ask' },
  { id: 'wooden-wall-shelf', group: 'decor', cat: 'wall-decor', tags: ['wall-statement'],
    name: { en: 'Wooden Wall Shelf', bn: 'কাঠের ওয়াল শেলফ' },
    desc: 'House-shaped wooden wall shelf with several open compartments. The second photo shows it styled on a wall in our showroom.',
    image: 'assets/home-decor/wall-decor/wooden-wall-shelf.webp',
    gallery: ['assets/showroom/shop-wall.webp'], model: null,
    price: null, colors: ['Dark wood'], materials: ['Wood'], dimensions: '', status: 'ask' }
];

/* Photos of the real shop, used for banners and the gallery. */
window.SHOWROOM_PHOTOS = [
  { src: 'assets/showroom/showcase-wide.webp',  alt: 'Carved showcase cabinets in the showroom' },
  { src: 'assets/showroom/bed-carved.webp',      alt: 'Carved wooden bed headboard' },
  { src: 'assets/showroom/dining-glass.webp',    alt: 'Glass top dining set' },
  { src: 'assets/showroom/showroom-1.webp',      alt: 'Inside the Talukder showroom' },
  { src: 'assets/showroom/shop-in-1.webp',       alt: 'Showroom corner with decor stand' },
  { src: 'assets/showroom/shop-in-2.webp',       alt: 'Showroom with fresh-look flowers' },
  { src: 'assets/showroom/shop-wall.webp',       alt: 'Wall decor display' },
  { src: 'assets/showroom/dressing-corner.webp', alt: 'Glass corner rack with decor' },
  { src: 'assets/showroom/shop-front.webp',      alt: 'Shop front, Talukder Market, Mokamtola' }
];

/* Shop details (change here only). */
window.SHOP = {
  name: 'Talukder Furniture & Home Decor',
  nameBn: 'তালুকদার ফার্নিচার অ্যান্ড হোম ডেকর',
  owner: 'MD. Zillul Bary',
  whatsapp: '8801757826005',      whatsappShow: '01757-826005',
  phone: '+8801724553778',        phoneShow: '01724-553778',
  facebook: 'https://www.facebook.com/profile.php?id=61592684526481',
  map: 'https://maps.app.goo.gl/Z6YrHjyT56jU5Qii7',
  address: 'Talukder Market, Joypurrastar Mor, east side of the overbridge, Mokamtola, Bogura',
  addressBn: 'তালুকদার মার্কেট, জয়পুররাস্তার মোড়, ওভারব্রিজের পূর্ব পাশে, মোকামতলা, বগুড়া',
  /* opening hours: day 0 = Sunday ... 6 = Saturday, [openHour, closeHour] in 24h */
  hours: { 0: [10, 21], 1: [10, 21], 2: [10, 21], 3: [10, 21], 4: [10, 21], 5: [15, 21], 6: [10, 21] },
  defaultLang: 'bn',            /* 'bn' = Bangla first, 'en' = English first (visitors can switch) */
  github: { owner: 'Sifat049', repo: 'talukder-furniture' }
};
