/* Loading screen: shows until the images at the top of the page have loaded.
   Shown once per visit (first page opened); never stays longer than MAX_WAIT. */
(function () {
  var MIN_SHOW = 500;    // ms: shortest time the loader stays up (avoids a flash)
  var MAX_WAIT = 8000;   // ms: gives up after this so the page is never stuck

  try {
    if (sessionStorage.getItem("hm-loaded")) return;
    sessionStorage.setItem("hm-loaded", "1");
  } catch (e) {}

  var css = document.createElement("style");
  css.textContent =
    "html.is-loading{overflow:hidden}" +
    "#loader{position:fixed;inset:0;z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:28px;background:var(--cream,#faf5ef);transition:opacity .5s ease,visibility .5s ease}" +
    "#loader.is-done{opacity:0;visibility:hidden}" +
    "#loader img{width:min(220px,50vw);animation:hm-pulse 1.4s ease-in-out infinite}" +
    "#loader .hm-dots{display:flex;gap:10px}" +
    "#loader .hm-dots i{width:12px;height:12px;border-radius:50%;background:var(--blue,#2a4bc0);animation:hm-bounce 1s ease-in-out infinite}" +
    "#loader .hm-dots i:nth-child(2){animation-delay:.15s}" +
    "#loader .hm-dots i:nth-child(3){animation-delay:.3s}" +
    "@keyframes hm-pulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.06);opacity:.8}}" +
    "@keyframes hm-bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-10px)}}" +
    "@media (prefers-reduced-motion:reduce){#loader img,#loader .hm-dots i{animation:none}}";
  document.head.appendChild(css);

  var el = document.createElement("div");
  el.id = "loader";
  el.setAttribute("aria-label", "Loading");
  el.innerHTML = '<img src="assets/brand/logo.png" alt="Habimerch"><div class="hm-dots"><i></i><i></i><i></i></div>';
  document.documentElement.appendChild(el);
  document.documentElement.classList.add("is-loading");

  var start = Date.now();
  var loaded = false;
  window.addEventListener("load", function () { loaded = true; });

  // true when every image currently in the visible part of the page has finished loading
  function visibleImagesReady() {
    var imgs = document.images;
    for (var i = 0; i < imgs.length; i++) {
      var im = imgs[i];
      if (el.contains(im) || im.complete) continue;
      var r = im.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) return false;
    }
    return true;
  }

  var okChecks = 0;
  var timer = setInterval(function () {
    var elapsed = Date.now() - start;
    okChecks = (loaded && visibleImagesReady()) ? okChecks + 1 : 0;
    if ((okChecks >= 3 && elapsed >= MIN_SHOW) || elapsed >= MAX_WAIT) {
      clearInterval(timer);
      el.classList.add("is-done");
      document.documentElement.classList.remove("is-loading");
      setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 600);
    }
  }, 120);
})();
