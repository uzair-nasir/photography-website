const galleryItems = [
  {
    title: "Evening Path",
    context: "Dulles, early morning",
    category: "Nature / Landscapes",
    src: "assets/photos/sunset-ridge.svg",
    alt: "Warm sunset over layered mountain landscape",
  },
  {
    title: "After Rain",
    context: "Street reflections",
    category: "Street / Everyday",
    src: "assets/photos/after-rain.svg",
    alt: "City street with reflections after rain",
  },
  {
    title: "Quiet Terminal",
    context: "Gate B, pre-sunrise",
    category: "Travel / Spaces",
    src: "assets/photos/gate-horizon.svg",
    alt: "Airport terminal interior with broad windows",
  },
  {
    title: "Quiet Geometry",
    context: "Interior study",
    category: "Architecture / Interiors",
    src: "assets/photos/quiet-geometry.svg",
    alt: "Minimal interior architecture with clean lines",
  },
  {
    title: "Forest Air",
    context: "Morning haze",
    category: "Nature / Landscapes",
    src: "assets/photos/forest-air.svg",
    alt: "Trees lit by soft morning light",
  },
  {
    title: "Passing Light",
    context: "Evening ridge",
    category: "Travel / Spaces",
    src: "assets/photos/passing-light.svg",
    alt: "Landscape with sun rays over distant hills",
  },
];

const heroSlides = [
  {
    src: "assets/photos/hero-feature.svg",
    alt: "Mountain horizon at sunset with cinematic tones",
  },
  {
    src: "assets/photos/passing-light.svg",
    alt: "Soft evening light over distant terrain",
  },
  {
    src: "assets/photos/gate-horizon.svg",
    alt: "Quiet terminal architecture with strong lines",
  },
  {
    src: "assets/photos/sunset-ridge.svg",
    alt: "Layered landscape at dusk",
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
      <figure class="gallery-item" data-label="${item.category}" data-title="${item.title}" data-context="${item.context}" tabindex="0" role="button" aria-label="Open ${item.title}">
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
    lightboxCaption.textContent = `${figure.dataset.title} · ${figure.dataset.context}`;
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


const heroRotator = document.getElementById("hero-rotator");
const heroDots = document.getElementById("hero-dots");
let heroIndex = 0;
let heroTimer;

function renderHero(active = 0) {
  if (!heroRotator || !heroDots) return;

  heroRotator.innerHTML = heroSlides
    .map(
      (slide, index) =>
        `<img class="hero-slide ${index === active ? "is-active" : ""}" src="${slide.src}" alt="${slide.alt}" loading="${index === 0 ? "eager" : "lazy"}" ${index === 0 ? 'fetchpriority="high"' : ""} />`
    )
    .join("");

  heroDots.innerHTML = heroSlides
    .map(
      (_, index) =>
        `<button type="button" class="hero-dot ${index === active ? "is-active" : ""}" data-hero-index="${index}" aria-label="View hero image ${index + 1}"></button>`
    )
    .join("");
}

function setHero(index) {
  heroIndex = (index + heroSlides.length) % heroSlides.length;
  const slides = heroRotator?.querySelectorAll(".hero-slide");
  const dots = heroDots?.querySelectorAll(".hero-dot");
  slides?.forEach((slide, i) => slide.classList.toggle("is-active", i === heroIndex));
  dots?.forEach((dot, i) => dot.classList.toggle("is-active", i === heroIndex));
}

function startHeroRotation() {
  if (!heroRotator) return;
  clearInterval(heroTimer);
  heroTimer = setInterval(() => setHero(heroIndex + 1), 5500);
}

function setupHeroInteractions() {
  if (!heroRotator || !heroDots) return;
  renderHero(0);
  startHeroRotation();

  heroDots.addEventListener("click", (event) => {
    const dot = event.target.closest("button[data-hero-index]");
    if (!dot) return;
    setHero(Number(dot.dataset.heroIndex));
    startHeroRotation();
  });

  heroRotator.addEventListener("mouseenter", () => clearInterval(heroTimer));
  heroRotator.addEventListener("mouseleave", startHeroRotation);

  let touchStartX = 0;
  heroRotator.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].clientX;
    clearInterval(heroTimer);
  });

  heroRotator.addEventListener("touchend", (event) => {
    const delta = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) > 35) setHero(heroIndex + (delta < 0 ? 1 : -1));
    startHeroRotation();
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
setupHeroInteractions();
