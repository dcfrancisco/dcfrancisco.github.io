document.addEventListener("DOMContentLoaded", function () {
  const search = document.getElementById("tools-search");
  const category = document.getElementById("tools-category");
  const cards = Array.from(document.querySelectorAll(".tool-card"));

  function filter() {
    const q = search?.value?.toLowerCase().trim() || "";
    const cat = category?.value || "";

    cards.forEach((card) => {
      const title =
        card.querySelector(".tool-title")?.textContent?.toLowerCase() || "";
      const desc =
        card.querySelector(".tool-meta")?.textContent?.toLowerCase() || "";
      const cats = (card.dataset.categories || "").toLowerCase();
      const matchesQuery = q === "" || title.includes(q) || desc.includes(q);
      const matchesCat =
        cat === "" || cats.split(",").includes(cat.toLowerCase());
      card.style.display = matchesQuery && matchesCat ? "" : "none";
    });
  }

  if (search) search.addEventListener("input", filter);
  if (category) category.addEventListener("change", filter);
  filter();
});
