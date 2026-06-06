/* =============================================================
   Lic. Camilo — main.js
   Vanilla JS · patrón IIFE · clásico (sin módulos, funciona en file://)
   Solo enriquece: el contenido y los enlaces ya funcionan sin JS.
   ============================================================= */
(function () {
  "use strict";

  /* ---------- Helpers ---------- */
  const $  = (sel, scope) => (scope || document).querySelector(sel);
  const $$ = (sel, scope) => Array.from((scope || document).querySelectorAll(sel));
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function safe(fn, name) { try { fn(); } catch (e) { console.warn("[" + name + "]", e); } }

  /* ---------- Header: estado al hacer scroll ---------- */
  function initHeader() {
    const header = $("[data-header]");
    if (!header) return;
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Menú móvil ---------- */
  function initNav() {
    const header = $("[data-header]");
    const toggle = $("[data-nav-toggle]");
    const nav = $("[data-nav]");
    if (!header || !toggle || !nav) return;

    const close = () => {
      header.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menú");
    };
    const open = () => {
      header.classList.add("nav-open");
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Cerrar menú");
    };

    toggle.addEventListener("click", () => {
      header.classList.contains("nav-open") ? close() : open();
    });
    // Cerrar al elegir un enlace
    nav.addEventListener("click", (e) => {
      if (e.target.closest("a")) close();
    });
    // Cerrar con Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  }

  /* ---------- Scroll suave con offset para anclas ---------- */
  function initSmoothScroll() {
    const headerH = 84;
    document.addEventListener("click", (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      const top = el.getBoundingClientRect().top + window.scrollY - headerH;
      window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
      history.replaceState(null, "", id);
    });
  }

  /* ---------- Reveals al hacer scroll (IntersectionObserver) ---------- */
  function initReveals() {
    const items = $$(".reveal");
    if (!items.length) return;

    // Sin soporte / reduced-motion: mostrar todo de inmediato
    if (reduced || typeof IntersectionObserver === "undefined") {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        // Escalonado suave entre hermanos
        const siblings = el.parentElement ? Array.from(el.parentElement.children).filter((c) => c.classList.contains("reveal")) : [el];
        const idx = Math.max(0, siblings.indexOf(el));
        el.style.transitionDelay = Math.min(idx * 80, 320) + "ms";
        el.classList.add("is-visible");
        io.unobserve(el);
      });
    }, { threshold: 0.04, rootMargin: "0px 0px -4% 0px" });

    items.forEach((el) => io.observe(el));

    // Red de seguridad: a los 6s revelar lo que siga oculto en pantalla
    setTimeout(() => {
      $$(".reveal:not(.is-visible)").forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight + 200) {
          el.classList.add("is-visible");
        }
      });
    }, 6000);
  }

  /* ---------- Accordion (FAQ) ---------- */
  function initAccordion() {
    const root = $("[data-accordion]");
    if (!root) return;
    const items = $$(".acc-item", root);

    items.forEach((item) => {
      const trigger = $(".acc-trigger", item);
      const panel = $(".acc-panel", item);
      if (!trigger || !panel) return;

      trigger.addEventListener("click", () => {
        const isOpen = trigger.getAttribute("aria-expanded") === "true";

        // Cerrar los demás (un solo panel abierto a la vez)
        items.forEach((other) => {
          if (other === item) return;
          $(".acc-trigger", other).setAttribute("aria-expanded", "false");
          $(".acc-panel", other).classList.remove("is-expanded");
          other.classList.remove("is-open");
        });

        trigger.setAttribute("aria-expanded", String(!isOpen));
        panel.classList.toggle("is-expanded", !isOpen);
        item.classList.toggle("is-open", !isOpen);
      });
    });
  }

  /* ---------- Botón flotante de WhatsApp ---------- */
  function initWaFloat() {
    const wa = $("[data-wa-float]");
    if (!wa) return;
    const onScroll = () => wa.classList.toggle("is-visible", window.scrollY > 620);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Año del footer ---------- */
  function initYear() {
    const el = $("[data-year]");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  /* ---------- Boot ---------- */
  function boot() {
    safe(initHeader, "initHeader");
    safe(initNav, "initNav");
    safe(initSmoothScroll, "initSmoothScroll");
    safe(initReveals, "initReveals");
    safe(initAccordion, "initAccordion");
    safe(initWaFloat, "initWaFloat");
    safe(initYear, "initYear");
    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
