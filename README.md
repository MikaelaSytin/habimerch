# Habimerch website

Plain HTML / CSS / JavaScript. No install, no build step.

## Open it in VS Code
1. Unzip the folder, then in VS Code: **File → Open Folder…** and pick `habimerch`.
2. Install the **Live Server** extension (Ritwick Dey), right-click `index.html` → **Open with Live Server**.
   (Double-clicking `index.html` also works.)

## Folder map
```
habimerch/
├─ index.html          Home
├─ shop-all.html       Shop All
├─ apparel.html        All Apparel
├─ bundles.html        All Bundles
├─ items.html          All Items
├─ product.html        Product page (one template for every product)
├─ css/style.css       Colors, fonts, layout (colors are at the top)
├─ js/config.js        ★ Order form link, announcement text, hero, brand file names, socials
├─ js/products.js      ★ Your product list
└─ assets/
   ├─ brand/           ★ Upload logos + drawings here
   ├─ hero/            ★ Upload hero video / image here
   └─ products/<slug>/ ★ One folder per product for its photos
```

## 1. Order Now → Google Form
Every "Order Now" button opens your Google Form directly in a new tab. The link is `orderFormUrl` in `js/config.js` (use the form's public link ending in `/viewform`).

## 2. Hero video (home page)
Save your video as `assets/hero/hero.mp4`. It autoplays, muted, and loops.
Also add `assets/hero/hero.jpg` as the still shown while it loads.
Tips: keep it under ~10 MB, H.264 MP4, no audio needed.

## 2b. About section (home page, under the hero)
Full-width navy band: photos on the left (they fade from one to the next), text on the right.
- Photos: put them in `assets/about/` as `1.jpg`, `2.jpg`, `3.jpg` … or list your own file names under `about.images` in `js/config.js`.
- Speed: `about.intervalMs` (4000 = 4 seconds per photo).
- Heading and description: edit `about` in `js/config.js`. Each line in `paragraphs` is one paragraph.

## 3. Brand assets (logo + drawings)
Drop these into `assets/brand/` with these exact names (PNG with transparent background recommended):

| File | Where it appears |
|---|---|
| `logo.png` | Habimerch logo, top-left of every page |
| `footer-logo.png` | Home Sweet Homie logo in the footer |
| `category-apparel.png` | Drawing on the "Apparel" card |
| `category-bundles.png` | Drawing on the "Bundles" card |
| `category-items.png` | Drawing on the "Items" card |
| `hfh-bc-logo.png` | HFH BC logo, bottom right of the footer (links to the URL in `config.js`) |

Until a file is there you'll see a dashed box with its name. To use a different file name, change it in `js/config.js`.

## 4. Products and photos
Everything is in `js/products.js`. For each product:
1. Make sure its folder exists: `assets/products/<slug>/` (the 8 sample products already have folders).
2. Drop in the photos (`1.jpg`, `2.jpg`, `3.jpg`, `4.jpg`, or list your own file names in `images`).
3. That's it:
   - the **1st image** is the cover on cards
   - **hovering** a card swaps through the other images
   - the **product page** shows all of them (thumbnails on the side on desktop, below on mobile)

To add a product, copy one block in `products.js`, give it a new `slug`, and make a matching folder.
Categories are `"apparel"`, `"items"`, `"bundles"`. Set `recommended: true` to feature a product on the home page (first 4 show).

## 5. "NEW" and "LIMITED" tags
In `products.js`, set the product's `badge`:
```js
badge: "new"       // green NEW tag, top-left of the photo
badge: "limited"   // orange LIMITED tag
badge: null        // no tag
```
The tag shows on the preview image everywhere the product appears (home, category pages, "You may also like").

## 6. Other edits
- Announcement bar text, footer text and social handles: `js/config.js`
- Brand colors: top of `css/style.css` (`--blue`, `--cream`, `--orange`, …)
- Fonts: currently Google Fonts stand-ins (Lilita One for the chunky headings, DM Sans for body, Fredoka for prices). Swap them in the `<link>` tags and the `--font-*` variables if you have the real brand fonts.

## Putting it online
Any static host works: Netlify Drop (drag the folder onto netlify.com/drop), GitHub Pages, Vercel, etc.
