/* ===========================
   THEME TOGGLE — script.js
=========================== */
(function () {
  "use strict";

  const html = document.documentElement;
  const toggleBtn = document.getElementById("theme-toggle");
  const toggleIcon = document.getElementById("toggle-icon");
  const logoImg = document.getElementById("profile-avatar");

  const STORAGE_KEY = "nahom-theme";
  const DARK = "dark";
  const LIGHT = "light";

  // --- helpers ---------------------------------------------------------

  function getPreferred() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === DARK || stored === LIGHT) return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? DARK
      : LIGHT;
  }

  function applyTheme(theme) {
    html.setAttribute("data-theme", theme);

    toggleIcon.innerHTML =
      theme === DARK
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';

    localStorage.setItem(STORAGE_KEY, theme);
  }

  function toggleTheme() {
    const current = html.getAttribute("data-theme");
    const next = current === DARK ? LIGHT : DARK;

    // Spin animation
    toggleIcon.classList.add("spinning");
    setTimeout(() => toggleIcon.classList.remove("spinning"), 420);

    applyTheme(next);
  }

  // --- init ------------------------------------------------------------

  // Apply saved / system preference immediately (before paint)
  applyTheme(getPreferred());

  // Attach click handler
  toggleBtn.addEventListener("click", toggleTheme);

  // React to OS-level theme changes
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", function (e) {
      if (!localStorage.getItem(STORAGE_KEY)) {
        applyTheme(e.matches ? DARK : LIGHT);
      }
    });
})();
