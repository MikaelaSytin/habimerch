/* ==========================================================
   HABIMERCH – PRODUCT LIST
   Add, remove or edit products here. Each product is one block.

   slug         unique, lowercase, no spaces. It is also the NAME OF
                THE FOLDER where you upload this product's photos:
                assets/products/<slug>/
   name         product name
   price        text shown as-is, e.g. "₱350"
   category     "apparel", "items" or "bundles"
   badge        "new", "limited", or null (no tag)
   designedBy   shown as "Designed by – ..."
   description  short description
   recommended  true = appears in "Recommended for you" on the home page
                (the first 4 recommended products are shown)
   colors       OPTIONAL. Lets the product page switch photos by color.
                Each color: { name, hex (swatch color), images: [file names] }
                Files live in the same folder (assets/products/<slug>/).
                The first color is shown by default. If you use colors,
                you can leave out "images" (cards use the first color's photos).
   images       list of file names inside the product's folder.
                The 1st image is the cover; the others swap in when
                someone hovers, and all of them appear on the product
                page. Files that don't exist yet are skipped, so you
                can leave extras listed. Use any file names / types
                (.jpg .png .webp) – just list them here.
   ========================================================== */

window.PRODUCTS = [
  {
    slug: "breakfast-tee",
    name: "Breakfast Tee",
    price: "₱400",
    category: "apparel",
    badge: null,
    description: "Wake up and serve looks with our Breakfast Tee, the perfect start to your everyday fit!",
    recommended: true,
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg"]
  },
  {
    slug: "sleeper-build-sweatshirt",
    name: "Sleeper Build Sweatshirt",
    price: "₱950",
    category: "apparel",
    badge: null,
    description: "Stay cozy and keep it low-key with our Sleeper Build sweatshirt, where comfort meets effortless style.",
    recommended: true,
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg"]
  },
  {
    slug: "house-blend-tee",
    name: "House Blend Tee",
    price: "₱400",
    category: "apparel",
    badge: null,
    description: "The perfect everyday blend. Keep it classic and cozy in our House Blend Tee!",
    recommended: true,
    colors: [
      { name: "Cream",     hex: "#F3EBDD", images: ["cream-1.jpg", "cream-2.jpg", "cream-3.jpg", "cream-4.jpg"] },
      { name: "Navy Blue", hex: "#1F2A5A", images: ["navy-1.jpg", "navy-2.jpg", "navy-3.jpg", "navy-4.jpg"] },
    ]
  },
  {
    slug: "barista-cap",
    name: "Barista Cap",
    price: "₱350",
    category: "apparel",
    badge: null,
    description: "Build the best cup of coffee with our barista thinking cap!",
    recommended: true,
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg"]
  },
  {
    slug: "homie-keychain",
    name: "Homie Keychain",
    price: "₱120",
    category: "items",
    badge: null,
    description: "Take a piece of home with you wherever you are with our Homie Keychain.",
    recommended: false,
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg"]
  },
  {
    slug: "homie-stickers",
    name: "Homie Stickers",
    price: "₱100",
    category: "items",
    badge: null,
    description: "Stick with what feels like home! Personalize your items with our Homie Stickers!",
    recommended: false,
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg"]
  },
  {
    slug: "barista-bobbi-bundle",
    name: "Barista Bobbi Bundle",
    price: "₱700",
    category: "bundles",
    badge: null,
    description: "Bobbi builds best with the Barista Bobbi Bundle, mixing the House Blend Tee and Barista Cap for the perfect next fit.",
    recommended: false,
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg"]
  },
    {
    slug: "brewmaster-bundle",
    name: "Brewmaster Bundle",
    price: "₱1650",
    category: "bundles",
    badge: null,
    description: "Level up your daily drip! Complete the full cafe fit with the Brewmaster Bundle. Choose your fave tee and match it with the Sleeper Build Sweatshirt and Barista Cap for the perfect layered look.",
    recommended: false,
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg"]
  },
    {
    slug: "homie-essentials",
    name: "Homie Essentials",
    price: "₱520",
    category: "bundles",
    badge: null,
    description: "Home is where the heart is. Always remember that by carrying around our homie essentials: The Barista Cap, Homie Keychain, and Homie Stickers.",
    recommended: false,
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg"]
  }
];