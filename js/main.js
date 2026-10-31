/* ==========================================================
   HABIMERCH – page builder. You normally don't need to edit this.
   Settings live in config.js, products in products.js.
   ========================================================== */
(function () {
  "use strict";

  var C = window.SITE_CONFIG;
  var PRODUCTS = window.PRODUCTS || [];
  var page = document.body.dataset.page;
  document.body.classList.add("page-" + page);

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  var bySlug = {};
  PRODUCTS.forEach(function (p) { bySlug[p.slug] = p; });

  var CATS = {
    apparel: { label: "Apparel", href: "apparel.html", title: "All Apparel", cta: "Shop Apparel", art: C.brand.categoryApparel },
    items:   { label: "Items",   href: "items.html",   title: "All Items",   cta: "Shop Items",   art: C.brand.categoryItems },
    bundles: { label: "Bundles", href: "bundles.html", title: "All Bundles", cta: "Shop Bundles", art: C.brand.categoryBundles }
  };

  function brandImg(file, cls, alt) {
    return '<img class="' + cls + '" src="' + C.brandFolder + esc(file) + '" alt="' + esc(alt) + '" data-file="' + esc(file) + '">';
  }

  /* If a brand image file is missing, show a labelled dashed box instead */
  document.addEventListener("error", function (e) {
    var t = e.target;
    if (t && t.tagName === "IMG" && t.dataset.file) {
      var s = document.createElement("span");
      s.className = t.className + " ph";
      s.textContent = t.dataset.file;
      t.replaceWith(s);
    }
  }, true);

  /* ---------- product images (only keep files that exist) ---------- */
  var imgCache = {};
  function loadImages(files, slug) {
    var key = slug + "|" + files.join(",");
    if (!imgCache[key]) {
      imgCache[key] = Promise.all(files.map(function (f) {
        return new Promise(function (resolve) {
          var url = "assets/products/" + slug + "/" + f;
          var im = new Image();
          im.onload = function () { resolve(url); };
          im.onerror = function () { resolve(null); };
          im.src = url;
        });
      })).then(function (list) { return list.filter(Boolean); });
    }
    return imgCache[key];
  }
  /* images used on cards: the product's own "images", or every color's images combined if it has none */
  function getImages(p) {
    var files = p.images || (p.colors ? [].concat.apply([], p.colors.map(function (c) { return c.images || []; })) : []);
    return loadImages(files, p.slug);
  }

  /* ---------- icons ---------- */
  var ICONS = {
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5"/><path d="M14 3c.3 2.6 2 4.4 5 4.6"/></svg>'
  };

  /* ---------- shared pieces ---------- */
  function announcement() {
    var group = C.announcements.map(function (t) {
      return "<span>" + esc(t) + "</span><i>•</i>";
    }).join("");
    group = group + group + group + group;
    return '<div class="announce"><div class="announce__track">' + group + group + "</div></div>";
  }

  function header() {
    var active = (page === "product" || page === "all") ? "all" : page;
    function link(key, label, href) {
      return '<a href="' + href + '"' + (active === key ? ' class="is-active"' : "") + ">" + label + "</a>";
    }
    return '<header class="site-header">' +
      '<a class="logo-link" href="index.html">' + brandImg(C.brand.logo, "logo", "Habimerch") + "</a>" +
      '<nav class="nav" id="nav">' +
        link("all", "Shop All", "shop-all.html") +
        link("apparel", "Apparel", "apparel.html") +
        link("items", "Items", "items.html") +
        link("bundles", "Bundles", "bundles.html") +
        '<a class="btn-pill nav__order" href="' + esc(C.orderFormUrl) + '" target="_blank" rel="noopener">Order Now</a>' +
      "</nav>" +
      '<a class="btn-pill header__order" href="' + esc(C.orderFormUrl) + '" target="_blank" rel="noopener">Order Now</a>' +
      '<button class="burger" id="burger" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>' +
    "</header>";
  }

  function footer() {
    var socials = C.socials.map(function (s) {
      return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + (ICONS[s.type] || "") + "<span>" + esc(s.handle) + "</span></a></li>";
    }).join("");
    return '<footer class="footer"><div class="footer__inner">' +
      '<div class="footer__brand">' + brandImg(C.brand.footerLogo, "footer__logo", "Home Sweet Homie") + "</div>" +
      '<div class="footer__col"><h3>Ordering</h3><p>' + esc(C.orderingText) + "</p></div>" +
      '<div class="footer__col"><h3>Follow</h3><ul>' + socials + "</ul></div>" +
    '<a class="footer__hfh" href="' + esc(C.hfhUrl) + '" target="_blank" rel="noopener" aria-label="Habitat for Humanity Blue Chapter">' + brandImg(C.brand.hfhLogo, "footer__hfhlogo", "HFH BC") + "</a>" +
    "</div></footer>";
  }

  function categorySection() {
    var cards = Object.keys(CATS).map(function (k) {
      var c = CATS[k];
      return '<a class="cat cat--' + k + '" href="' + c.href + '">' +
        '<h3>' + c.label + "</h3><span>" + c.cta + " →</span>" +
        brandImg(c.art, "cat__art", c.label) +
      "</a>";
    }).join("");
    return '<section class="cats"><h2 class="display">Shop by Category</h2><div class="cats__grid">' + cards + "</div></section>";
  }

  /* ---------- product cards ---------- */
  function card(p) {
    var badge = p.badge ? '<span class="badge badge--' + esc(p.badge) + '">' + esc(p.badge) + "</span>" : "";
    return '<a class="card" href="product.html?p=' + encodeURIComponent(p.slug) + '" data-slug="' + esc(p.slug) + '">' +
      '<div class="card__media is-empty">' + badge + '<span class="ph-label">Product image</span></div>' +
      '<div class="card__info"><span class="card__name">' + esc(p.name) + '</span><span class="card__price">' + esc(p.price) + "</span></div>" +
    "</a>";
  }

  /* Fills cards with images and sets up the hover swap */
  function hydrate(root) {
    root.querySelectorAll(".card").forEach(function (el) {
      var p = bySlug[el.dataset.slug];
      if (!p) return;
      getImages(p).then(function (urls) {
        if (!urls.length) return;
        var media = el.querySelector(".card__media");
        media.classList.remove("is-empty");
        var lbl = media.querySelector(".ph-label");
        if (lbl) lbl.remove();
        urls.forEach(function (u, i) {
          var im = document.createElement("img");
          im.src = u;
          im.alt = p.name;
          im.className = "card__img" + (i === 0 ? " is-on" : "");
          media.appendChild(im);
        });
        if (urls.length < 2) return;
        var imgs = media.querySelectorAll(".card__img");
        var idx = 0, timer = null;
        function show(n) { imgs[idx].classList.remove("is-on"); idx = n; imgs[idx].classList.add("is-on"); }
        el.addEventListener("mouseenter", function () {
          show(1);
          timer = setInterval(function () { show((idx + 1) % imgs.length); }, C.hoverSwapMs);
        });
        el.addEventListener("mouseleave", function () { clearInterval(timer); show(0); });
      });
    });
  }

  /* ---------- pages ---------- */
  function homePage() {
    var rec = PRODUCTS.filter(function (p) { return p.recommended; }).slice(0, 4);
    var about = C.about || {};
    var aboutText = (about.paragraphs || []).map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("");
    return '<section class="hero" id="hero">' +
        '<video class="hero__video" id="heroVideo" autoplay muted loop playsinline preload="auto" poster="' + esc(C.hero.poster) + '">' +
          '<source src="' + esc(C.hero.video) + '" type="video/mp4"></video>' +
        //'<span class="hero__label">Hero video → assets/hero/hero.mp4</span>' +
      "</section>" +
      '<section class="about" id="about">' +
        '<div class="about__media is-empty" id="aboutMedia"><span class="ph-label">About photos → assets/about/1.jpg, 2.jpg …</span></div>' +
        '<div class="about__text"><div class="about__inner"><h2 class="about__title">' + esc(about.title || "About HabiMerch") + "</h2>" + aboutText + "</div></div>" +
      "</section>" +
      '<section class="wrap recommended">' +
        '<div class="recommended__head"><h2 class="display">Recommended for you</h2><a class="viewall" href="shop-all.html">View all →</a></div>' +
        '<div class="grid grid--home">' + rec.map(card).join("") + "</div>" +
      "</section>" +
      categorySection();
  }

  function listingPage(key) {
    var title, list;
    if (key === "all") { title = "Shop All"; list = PRODUCTS; }
    else { title = CATS[key].title; list = PRODUCTS.filter(function (p) { return p.category === key; }); }
    return '<section class="wrap listing"><h1 class="page-title">' + title + "</h1>" +
      (list.length ? '<div class="grid">' + list.map(card).join("") + "</div>" : '<p class="empty">Nothing here yet — check back soon!</p>') +
      "</section>" + categorySection();
  }

  function colorPicker(p) {
    if (!p.colors || !p.colors.length) return "";
    var dots = p.colors.map(function (c, i) {
      return '<button type="button" class="swatch' + (i === 0 ? " is-on" : "") + '" data-i="' + i + '" style="--swatch:' + esc(c.hex) + '" aria-label="' + esc(c.name) + '" title="' + esc(c.name) + '"></button>';
    }).join("");
    return '<div class="pdp__colors"><p class="pdp__colorlabel">Color: <b id="colorName">' + esc(p.colors[0].name) + '</b></p><div class="swatches" id="swatches">' + dots + "</div></div>";
  }

  function productPage() {
    var slug = new URLSearchParams(location.search).get("p");
    var p = bySlug[slug];
    if (!p) {
      return '<section class="wrap listing"><h1 class="page-title">Product not found</h1><p class="empty"><a href="shop-all.html">Back to Shop All →</a></p></section>';
    }
    document.title = p.name + " – Habimerch";
    var related = PRODUCTS.filter(function (x) { return x.slug !== p.slug && x.category === p.category; })
      .concat(PRODUCTS.filter(function (x) { return x.slug !== p.slug && x.category !== p.category; }))
      .slice(0, 4);
    return '<div class="wrap">' +
      '<nav class="crumbs"><a href="index.html">Home</a><span>/</span><b>' + esc(p.name) + "</b></nav>" +
      '<section class="pdp">' +
        '<div class="gallery"><div class="gallery__thumbs" id="thumbs"></div>' +
          '<div class="gallery__main is-empty" id="gmain"><span class="ph-label">Main product image</span></div></div>' +
        '<div class="pdp__info">' +
          "<h1>" + esc(p.name) + "</h1>" +
          '<p class="pdp__price">' + esc(p.price) + "</p>" +
          //'<p class="pdp__by">Designed by – ' + esc(p.designedBy) + "</p>" +//
          '<p class="pdp__desc">' + esc(p.description) + "</p>" +
          colorPicker(p) +
          '<a class="btn-block" href="' + esc(C.orderFormUrl) + '" target="_blank" rel="noopener">Order Now</a>' +
        "</div>" +
      "</section>" +
      '<section class="related"><h2 class="h2">You may also like</h2><div class="grid grid--home">' + related.map(card).join("") + "</div></section>" +
    "</div>";
  }

  function setupGallery(p) {
    var thumbs = document.getElementById("thumbs");
    var main = document.getElementById("gmain");
    if (!thumbs || !main) return;
    var colors = p.colors || [];
    var urls = [];
    var token = 0;   // ignores a slow image load if another color was clicked meanwhile

    function render(list) {
      urls = list;
      if (!urls.length) {
        main.classList.add("is-empty");
        main.innerHTML = '<span class="ph-label">Main product image</span>';
        thumbs.innerHTML = [1, 2, 3, 4].map(function (i) {
          return '<div class="thumb thumb--ph' + (i === 1 ? " is-on" : "") + '">IMG</div>';
        }).join("");
        return;
      }
      main.classList.remove("is-empty");
      main.innerHTML = '<img id="gmainImg" src="' + urls[0] + '" alt="' + esc(p.name) + '">';
      thumbs.innerHTML = urls.map(function (u, i) {
        return '<button class="thumb' + (i === 0 ? " is-on" : "") + '" data-i="' + i + '" aria-label="Image ' + (i + 1) + '"><img src="' + u + '" alt=""></button>';
      }).join("");
    }

    thumbs.addEventListener("click", function (e) {
      var b = e.target.closest(".thumb");
      if (!b || b.dataset.i == null) return;
      document.getElementById("gmainImg").src = urls[+b.dataset.i];
      thumbs.querySelectorAll(".thumb").forEach(function (t) { t.classList.remove("is-on"); });
      b.classList.add("is-on");
    });

    if (!colors.length) { getImages(p).then(render); return; }

    function showColor(i) {
      var t = ++token;
      loadImages(colors[i].images || [], p.slug).then(function (list) { if (t === token) render(list); });
    }
    showColor(0);
    colors.forEach(function (c) { loadImages(c.images || [], p.slug); });   // preload so switching is instant

    var sw = document.getElementById("swatches");
    sw.addEventListener("click", function (e) {
      var b = e.target.closest(".swatch");
      if (!b) return;
      sw.querySelectorAll(".swatch").forEach(function (s) { s.classList.remove("is-on"); });
      b.classList.add("is-on");
      document.getElementById("colorName").textContent = colors[+b.dataset.i].name;
      showColor(+b.dataset.i);
    });
  }

  function orderPage() {
    var url = C.orderFormUrl || "";
    var ok = /^https?:\/\//.test(url);
    var slug = new URLSearchParams(location.search).get("p");
    var p = bySlug[slug];
    var note = p ? '<p class="order__note">You\'re ordering: <b>' + esc(p.name) + "</b> — mention it in the form.</p>" : "";
    var body;
    if (ok) {
      var embed = url + (url.indexOf("?") > -1 ? "&" : "?") + "embedded=true";
      body = '<iframe class="order__frame" src="' + esc(embed) + '" title="Order form">Loading…</iframe>' +
        '<p class="order__fallback">Form not loading? <a href="' + esc(url) + '" target="_blank" rel="noopener">Open it in a new tab →</a></p>';
    } else {
      body = '<div class="order__missing">Add your Google Form link in <code>js/config.js</code> (<code>orderFormUrl</code>) and it will appear here.</div>';
    }
    return '<section class="wrap listing"><h1 class="page-title">Order</h1>' + note + body + "</section>";
  }

  /* ---------- build ---------- */
  var top = document.getElementById("site-top");
  var main = document.getElementById("main");
  var bottom = document.getElementById("site-bottom");

  top.innerHTML = announcement() + header();
  bottom.innerHTML = footer();

  var titles = { home: "Habimerch", all: "Shop All – Habimerch", apparel: "All Apparel – Habimerch", items: "All Items – Habimerch", bundles: "All Bundles – Habimerch", order: "Order – Habimerch" };
  document.title = titles[page] || "Habimerch";

  if (page === "home") main.innerHTML = homePage();
  else if (page === "product") main.innerHTML = productPage();
  else if (page === "order") main.innerHTML = orderPage();
  else main.innerHTML = listingPage(page);

  hydrate(document);
  if (page === "product") {
    var cur = bySlug[new URLSearchParams(location.search).get("p")];
    if (cur) setupGallery(cur);
  }

  /* about photos: fade from one to the next, automatically */
  var aboutMedia = document.getElementById("aboutMedia");
  if (aboutMedia && C.about && C.about.images && C.about.images.length) {
    Promise.all(C.about.images.map(function (f) {
      return new Promise(function (resolve) {
        var im = new Image(), url = "assets/about/" + f;
        im.onload = function () { resolve(url); };
        im.onerror = function () { resolve(null); };
        im.src = url;
      });
    })).then(function (list) {
      var urls = list.filter(Boolean);
      if (!urls.length) return;                       // no photos yet: keep the placeholder
      aboutMedia.classList.remove("is-empty");
      aboutMedia.innerHTML = "";
      var imgs = urls.map(function (u, i) {
        var im = document.createElement("img");
        im.src = u; im.alt = C.about.title || "About HabiMerch";
        if (i === 0) im.className = "is-on";
        aboutMedia.appendChild(im);
        return im;
      });
      if (imgs.length < 2) return;
      var cur = 0;
      setInterval(function () {
        if (document.hidden) return;
        imgs[cur].classList.remove("is-on");
        cur = (cur + 1) % imgs.length;
        imgs[cur].classList.add("is-on");
      }, C.about.intervalMs || 4000);
    });
  }

  /* hero video: make sure it loops/plays, show hint label if file is missing */
  var vid = document.getElementById("heroVideo");
  if (vid) {
    vid.muted = true;
    var play = vid.play();
    if (play && play.catch) play.catch(function () {});
    var src = vid.querySelector("source");
    src.addEventListener("error", function () { document.getElementById("hero").classList.add("is-empty"); });
  }

  /* home page only: hide the header when scrolling down, show it when scrolling up */
  if (page === "home") {
    var hdr = document.querySelector(".site-header");
    var ann = document.querySelector(".announce");
    var lastY = window.scrollY, ticking = false;
    function onScroll() {
      var y = Math.max(0, window.scrollY);
      var annH = ann ? ann.offsetHeight : 0;
      hdr.style.top = Math.max(0, annH - y) + "px";      // sits under the announcement bar, then sticks to the top
      hdr.classList.toggle("is-stuck", y > annH);          // solid background once it is over page content
      if (y > annH && y > lastY + 4) {                     // scrolling down
        hdr.classList.add("is-hidden");
        document.body.classList.remove("nav-open");
        document.getElementById("burger").setAttribute("aria-expanded", "false");
      } else if (y < lastY - 4 || y <= annH) {             // scrolling up, or back near the top
        hdr.classList.remove("is-hidden");
      }
      if (Math.abs(y - lastY) > 4) lastY = y;
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
    }, { passive: true });
    onScroll();
  }

  /* always land at the top of a page, and clicking a link to the page you're already on scrolls back to the top */
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  var reduceMotion = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  function toTop() {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }
  /* "swoosh": glide to the top (ease-out), then call done */
  function swoosh(done) {
    var from = window.scrollY;
    if (from < 4 || reduceMotion) { toTop(); if (done) done(); return; }
    var dur = Math.min(650, Math.max(320, from * 0.35));   // longer scroll = slightly longer swoosh
    var t0 = null;
    function step(t) {
      if (t0 === null) t0 = t;
      var k = Math.min(1, (t - t0) / dur);
      var e = 1 - Math.pow(1 - k, 3);                       // ease-out cubic
      window.scrollTo(0, from * (1 - e));
      if (k < 1) requestAnimationFrame(step); else if (done) done();
    }
    requestAnimationFrame(step);
  }
  toTop();                                                  // right now
  requestAnimationFrame(function () { toTop(); });          // after first paint
  window.addEventListener("load", function () { toTop(); setTimeout(toTop, 60); }); // after images/fonts settle
  window.addEventListener("pageshow", function (e) { if (e.persisted) toTop(); });

  var swooshing = false;
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a || a.target === "_blank" || e.metaKey || e.ctrlKey || e.shiftKey) return;
    var u = new URL(a.href, location.href);
    if (u.origin !== location.origin || u.hash) return;
    var samePage = u.pathname === location.pathname && u.search === location.search;
    // nav links, category cards, logo and "View all" swoosh up first; other links (like products) just go
    var swooshy = a.closest(".nav, .cat, .logo-link, .viewall");
    if (samePage) {
      e.preventDefault();
      document.body.classList.remove("nav-open");
      swoosh();
    } else if (swooshy && window.scrollY >= 4 && !reduceMotion) {
      e.preventDefault();
      if (swooshing) return;
      swooshing = true;
      document.body.classList.remove("nav-open");
      swoosh(function () { location.href = a.href; });
    } else {
      toTop();
    }
  });

  /* mobile menu */
  var burger = document.getElementById("burger");
  burger.addEventListener("click", function () {
    var open = document.body.classList.toggle("nav-open");
    burger.setAttribute("aria-expanded", open);
  });
})();