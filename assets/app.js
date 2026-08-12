/* ==========================================================================
   piotrsowiak.pl — logika strony
   Bez zależności zewnętrznych. Wszystko działa po stronie klienta.
   ========================================================================== */
(function () {
  "use strict";

  var html = document.documentElement;
  var LS = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  /* ---------------------------------------------------------------------- */
  /* Motyw: auto → light → dark → auto                                      */
  /* ---------------------------------------------------------------------- */
  var THEMES = ["auto", "light", "dark"];
  var themeBtn = document.getElementById("theme-toggle");

  function currentTheme() {
    var t = html.getAttribute("data-theme");
    return THEMES.indexOf(t) === -1 ? "auto" : t;
  }

  function applyTheme(theme) {
    html.setAttribute("data-theme", theme);
    LS.set("theme", theme);
    if (themeBtn) themeBtn.setAttribute("title", "Motyw: " + theme);
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = THEMES[(THEMES.indexOf(currentTheme()) + 1) % THEMES.length];
      applyTheme(next);
    });
  }

  /* ---------------------------------------------------------------------- */
  /* Język: PL / EN                                                          */
  /* ---------------------------------------------------------------------- */
  var langBtn = document.getElementById("lang-toggle");
  var langLabel = document.getElementById("lang-label");
  var dict = window.I18N || { pl: {}, en: {} };
  var lang = "pl";

  function t(key) {
    var pack = dict[lang] || {};
    return Object.prototype.hasOwnProperty.call(pack, key) ? pack[key] : key;
  }

  function applyLang(next) {
    lang = (next === "en") ? "en" : "pl";
    html.setAttribute("lang", lang);
    LS.set("lang", lang);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var pack = dict[lang] || {};
      if (Object.prototype.hasOwnProperty.call(pack, key)) el.textContent = pack[key];
    });

    document.title = t("meta.title");
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", t("meta.desc"));

    // przycisk pokazuje język, na który przełączy — nie aktualny
    if (langLabel) langLabel.textContent = (lang === "pl") ? "EN" : "PL";
    if (langBtn) langBtn.setAttribute("aria-label", lang === "pl" ? "Switch to English" : "Przełącz na polski");
  }

  // wykrywanie języka: zapis użytkownika → ustawienie przeglądarki → PL
  (function initLang() {
    var saved = LS.get("lang");
    if (saved === "pl" || saved === "en") { applyLang(saved); return; }
    var nav = (navigator.language || "pl").toLowerCase();
    applyLang(nav.indexOf("pl") === 0 ? "pl" : "en");
  })();

  if (langBtn) {
    langBtn.addEventListener("click", function () {
      applyLang(lang === "pl" ? "en" : "pl");
    });
  }

  /* ---------------------------------------------------------------------- */
  /* Menu mobilne                                                            */
  /* ---------------------------------------------------------------------- */
  var menuBtn = document.getElementById("menu-toggle");
  var nav = document.querySelector(".nav");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("is-open");
        menuBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------------------------------------------------------------------- */
  /* Header: cień po scrollu + podświetlenie aktywnej sekcji                 */
  /* ---------------------------------------------------------------------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () { header.classList.toggle("is-stuck", window.scrollY > 8); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
  var navLinks = {};
  document.querySelectorAll(".nav a[href^='#']").forEach(function (a) {
    navLinks[a.getAttribute("href").slice(1)] = a;
  });

  if ("IntersectionObserver" in window && sections.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = navLinks[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          Object.keys(navLinks).forEach(function (k) { navLinks[k].classList.remove("is-active"); });
          link.classList.add("is-active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    sections.forEach(function (s) { io.observe(s); });
  }

  /* ---------------------------------------------------------------------- */
  /* Kontakt                                                                 */
  /*                                                                         */
  /* Linki mailto siedzą wprost w HTML, nie są doklejane przez JS. Wcześniej */
  /* adres był składany tutaj (drobna ochrona przed scraperami), ale to      */
  /* uzależniało działanie kontaktu od tego, czy przeglądarka ma aktualny    */
  /* app.js. Kontakt to najważniejszy element strony — musi działać nawet    */
  /* przy zablokowanym lub przeterminowanym JS. Adres i tak jest widoczny    */
  /* jako tekst, więc obfuskacja niewiele dawała.                            */
  /* ---------------------------------------------------------------------- */
  var EMAIL = ["kontakt", "piotrsowiak.pl"].join("@");

  var copyBtn = document.getElementById("email-copy");
  var copyStatus = document.getElementById("copy-status");

  if (copyBtn && copyStatus) {
    var statusTimer;

    var flash = function (key, cls) {
      copyStatus.textContent = t(key);
      copyStatus.className = "copy-status is-visible" + (cls ? " " + cls : "");
      clearTimeout(statusTimer);
      statusTimer = setTimeout(function () {
        copyStatus.className = "copy-status";
      }, 3000);
    };

    /* Fallback dla przeglądarek bez Clipboard API (i dla http:// lokalnie —
       navigator.clipboard wymaga secure context). */
    var legacyCopy = function (text) {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.cssText = "position:absolute;left:-9999px;top:0";
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
      document.body.removeChild(ta);
      return ok;
    };

    var reportLegacy = function () {
      // uwaga: wywołujemy legacyCopy dokładnie raz i dopiero wynik mapujemy na komunikat
      var ok = legacyCopy(EMAIL);
      flash(ok ? "contact.copied" : "contact.copyErr", ok ? "ok" : "err");
    };

    copyBtn.addEventListener("click", function () {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(EMAIL).then(
          function () { flash("contact.copied", "ok"); },
          reportLegacy
        );
      } else {
        reportLegacy();
      }
    });
  }

  /* ---------------------------------------------------------------------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
