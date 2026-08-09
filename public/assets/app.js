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
  /* Email — składany w JS, żeby nie leżał gotowy w źródle dla scraperów     */
  /* ---------------------------------------------------------------------- */
  var EMAIL = ["kontakt", "piotrsowiak.pl"].join("@");
  var emailLink = document.getElementById("email-link");
  if (emailLink) {
    emailLink.setAttribute("href", "mailto:" + EMAIL);
    emailLink.textContent = EMAIL;
  }

  /* ---------------------------------------------------------------------- */
  /* Formularz kontaktowy                                                    */
  /* ---------------------------------------------------------------------- */
  var form = document.getElementById("contact-form");

  if (form) {
    var statusEl = document.getElementById("cf-status");
    var submitBtn = document.getElementById("cf-submit");

    /* Uwaga: NIE używamy form.name — na HTMLFormElement `name` to własna właściwość
       (atrybut name formularza), więc przesłania pole o tej nazwie. Sięgamy przez
       form.elements, gdzie named access działa przewidywalnie. */
    var fName = form.elements.namedItem("name");
    var fEmail = form.elements.namedItem("email");
    var fMessage = form.elements.namedItem("message");
    var fCompany = form.elements.namedItem("company");

    var setStatus = function (msg, cls) {
      statusEl.textContent = msg;
      statusEl.className = "form-status" + (cls ? " " + cls : "");
    };

    var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = fName.value.trim();
      var email = fEmail.value.trim();
      var message = fMessage.value.trim();
      var company = fCompany.value.trim(); // honeypot

      // bot wypełnił honeypot — udajemy sukces, nic nie wysyłamy
      if (company) { setStatus(t("form.ok"), "ok"); form.reset(); return; }

      fName.removeAttribute("aria-invalid");
      fEmail.removeAttribute("aria-invalid");
      fMessage.removeAttribute("aria-invalid");

      if (!name || !email || !message) {
        if (!name) fName.setAttribute("aria-invalid", "true");
        if (!email) fEmail.setAttribute("aria-invalid", "true");
        if (!message) fMessage.setAttribute("aria-invalid", "true");
        setStatus(t("form.errRequired"), "err");
        return;
      }
      if (!EMAIL_RE.test(email)) {
        fEmail.setAttribute("aria-invalid", "true");
        setStatus(t("form.errEmail"), "err");
        return;
      }

      submitBtn.disabled = true;
      setStatus(t("form.sending"), "");

      fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name, email: email, message: message, company: company })
      })
        .then(function (res) {
          if (!res.ok) throw new Error("HTTP " + res.status);
          return res.json().catch(function () { return {}; });
        })
        .then(function () {
          setStatus(t("form.ok"), "ok");
          form.reset();
        })
        .catch(function () {
          // Fallback: brak/awaria backendu → otwieramy klienta pocztowego.
          setStatus(t("form.errSend"), "err");
          var subject = encodeURIComponent("Kontakt ze strony piotrsowiak.pl — " + name);
          var body = encodeURIComponent(message + "\n\n—\n" + name + "\n" + email);
          window.location.href = "mailto:" + EMAIL + "?subject=" + subject + "&body=" + body;
        })
        .then(function () { submitBtn.disabled = false; });
    });
  }

  /* ---------------------------------------------------------------------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
