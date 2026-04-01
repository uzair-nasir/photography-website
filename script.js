const galleryItems = [
  {
    title: "Sunset Ridge",
    category: "Nature / Landscapes",
    src: "assets/photos/sunset-ridge.svg",
    alt: "Warm sunset over layered mountain landscape",
  },
  {
    title: "After Rain",
    category: "Street / Everyday",
    src: "assets/photos/after-rain.svg",
    alt: "City street with reflections after rain",
  },
  {
    title: "Gate Horizon",
    category: "Travel / Spaces",
    src: "assets/photos/gate-horizon.svg",
    alt: "Airport terminal interior with broad windows",
  },
  {
    title: "Quiet Geometry",
    category: "Architecture / Interiors",
    src: "assets/photos/quiet-geometry.svg",
    alt: "Minimal interior architecture with clean lines",
  },
  {
    title: "Forest Air",
    category: "Nature / Landscapes",
    src: "assets/photos/forest-air.svg",
    alt: "Trees lit by soft morning light",
  },
  {
    title: "Passing Light",
    category: "Travel / Spaces",
    src: "assets/photos/passing-light.svg",
    alt: "Landscape with sun rays over distant hills",
  },
];

const allCategories = [...new Set(galleryItems.map((item) => item.category))];

const categoryRow = document.querySelector(".category-row");
const grid = document.getElementById("gallery-grid");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxCaption = document.getElementById("lightbox-caption");

function renderCategories(activeCategory = "All") {
  const categories = ["All", ...allCategories];
  categoryRow.innerHTML = categories
    .map(
      (category) => `
      <button
        class="category-chip ${category === activeCategory ? "is-active" : ""}"
        type="button"
        data-category="${category}">
        ${category}
      </button>`
    )
    .join("");
}

function renderGallery(activeCategory = "All") {
  const filtered =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  if (!filtered.length) {
    grid.innerHTML = `<p class="eyebrow">No images in this category yet — coming soon.</p>`;
    return;
  }

  grid.innerHTML = filtered
    .map(
      (item) => `
      <figure class="gallery-item" data-label="${item.category}" tabindex="0" role="button" aria-label="Open ${item.title}">
        <img src="${item.src}" alt="${item.alt}" loading="lazy" />
      </figure>
    `
    )
    .join("");
}

if (categoryRow) {
  categoryRow.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-category]");
    if (!button) return;

    const selected = button.dataset.category;
    renderCategories(selected);
    renderGallery(selected);
  });
}

if (grid) {
  grid.addEventListener("click", (event) => {
    const figure = event.target.closest(".gallery-item");
    if (!figure) return;

    const image = figure.querySelector("img");
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = figure.dataset.label;
    lightbox.showModal();
  });

  grid.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const figure = event.target.closest(".gallery-item");
    if (!figure) return;
    figure.click();
  });
}

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox || event.target.classList.contains("lightbox-close")) {
      lightbox.close();
    }
  });
}

const navToggle = document.querySelector(".nav-toggle");
const primaryNav = document.querySelector(".primary-nav");

if (navToggle && primaryNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  primaryNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      primaryNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
if (categoryRow) renderCategories();
if (grid) renderGallery();
