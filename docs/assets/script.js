// Minimal JS: theme toggle and basic helpers
(function () {
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;
  const userPref = localStorage.getItem("theme");
  if (userPref === "light") document.documentElement.classList.add("light");
  btn.addEventListener("click", () => {
    const isLight = document.documentElement.classList.toggle("light");
    localStorage.setItem("theme", isLight ? "light" : "dark");
    btn.setAttribute("aria-pressed", String(isLight));
  });
})();
