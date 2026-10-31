/* ==========================================================
   HABIMERCH – SITE SETTINGS
   Edit the values below. You do not need to touch main.js.
   ========================================================== */

window.SITE_CONFIG = {

  /* 1) GOOGLE FORM -------------------------------------------------
     Every "Order Now" button (header + product pages) opens this
     link directly, in a new tab. Use the form's public link
     (ends in /viewform), not the editing link (ends in /edit).   */
  orderFormUrl: "https://docs.google.com/forms/d/1lHCykiJRd1S8CgFRrwLuKr2dq90RvBdVNMJe8B1_Y1U/viewform",

  /* 2) ANNOUNCEMENT BAR (scrolls across the top) ---------------- */
  announcements: [
    "Onsite Booth: Nov 19 - 20 (SEC B - Foyer)",
    "Get Your Merch Now!",
    "Limited Time Only"
  ],

  /* 3) HOME PAGE HERO ------------------------------------------
     Put your video at assets/hero/hero.mp4  (plays muted, on loop)
     Put a still image at assets/hero/hero.jpg (shown while the
     video loads, or if the video can't play).                    */
  hero: {
    video: "assets/hero/hero.mov",
    poster: "assets/hero/hero.jpg"
  },

  /* 3b) ABOUT SECTION (home page, full-width band under the hero)
     images:     the photos on the left. Put the files in assets/about/
                 and list their names here. They fade from one to the
                 next automatically. Files that don't exist are skipped.
     intervalMs: how long each photo stays (milliseconds)
     title:      the heading on the right
     paragraphs: each line in the list is one paragraph          */
  about: {
    images: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"],
    intervalMs: 4000,
    title: "About HabiMerch",
    paragraphs: [
      "An annual fundraising project under Habitat for Humanity Blue Chapter that aims to sell HFH BC merchandise through online pre-order and an onsite exhibit, which will be held in SEC-B Foyer on November 19-20, 2026.",
      "Led by the Finance Department in collaboration with Creative Communications, the goal is to raise awareness of the organization's advocacy and allow members and non-members to show their support, while raising funds for future projects and advocacy initiatives."
    ]
  },

  /* 4) HOVER IMAGE SWAP SPEED (milliseconds) ------------------- */
  hoverSwapMs: 900,

  /* 5) BRAND ASSETS --------------------------------------------
     Drop these files into assets/brand/ using these exact names
     (or change the names here). Until a file exists, the site
     shows a dashed box with the file name so you know what goes
     there.                                                       */
  brandFolder: "assets/brand/",
  brand: {
    logo:          "logo.png",            // Habimerch logo (top left)
    footerLogo:    "footer-logo.png",     // Home Sweet Homie logo (footer)
    categoryApparel: "category-apparel.png", // drawing on the "Apparel" card
    categoryItems:   "category-items.png",   // drawing on the "Items" card
    categoryBundles: "category-bundles.png", // drawing on the "Bundles" card
    hfhLogo:         "hfh-bc-logo.png"       // HFH BC logo (bottom right of footer)
  },

  /* 6) FOOTER ---------------------------------------------------- */
  /* Where the HFH BC logo in the footer links to */
  hfhUrl: "https://hfhbc.withbndr.com/",

  orderingText: "Orders are placed through a Google Form after you press Order.",
  socials: [
    { type: "instagram", handle:"@habimerch.blue", url:"https://www.instagram.com/habimerch.blue/"},
    { type: "instagram", handle: "@habitat.blue",    url: "https://www.instagram.com/habitat.blue" },
    { type: "facebook",  handle: "@HFH Blue Chapter", url: "https://www.facebook.com/profile.php?id=61590817539940" },
    { type: "tiktok",    handle: "@habitat.bc",      url: "https://www.tiktok.com/@habitat.bc" }
  ]
};
