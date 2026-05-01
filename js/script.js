/* ================= INIT LOG ================= */
console.log("JS LOADED");

/* ================= HELPERS ================= */
const formatCategoryName = (name) =>
  name.charAt(0).toUpperCase() + name.slice(1);


/* ================= CATEGORY SWITCH ================= */
function showCategory(categoryId, el) {
  document.querySelectorAll(".category")
    .forEach(c => c.classList.remove("active"));

  document.querySelectorAll(".tab")
    .forEach(t => t.classList.remove("active"));

  const activeSection = document.getElementById(categoryId);
  if (activeSection) {
    activeSection.classList.add("active");
    activeSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (el) el.classList.add("active");
}


/* ================= PRODUCTS ================= */
function loadProducts() {
  const container = document.getElementById("productContainer");
  const tabsContainer = document.getElementById("categoryTabs");

  if (!container || !tabsContainer || typeof products === "undefined") return;

  container.innerHTML = "";
  tabsContainer.innerHTML = "";

  Object.entries(products).forEach(([category, items], index) => {

    /* ===== TAB ===== */
    const tab = document.createElement("button");
    tab.className = "tab";
    tab.textContent = formatCategoryName(category);

    tab.addEventListener("click", () => showCategory(category, tab));

    if (index === 0) tab.classList.add("active");
    tabsContainer.appendChild(tab);

    /* ===== SECTION ===== */
    const section = document.createElement("section");
    section.className = "category";
    section.id = category;

    if (index === 0) section.classList.add("active");

    /* ===== HEADER ===== */
    const header = document.createElement("div");
    header.className = "section-header";

    const title = document.createElement("h2");
    title.textContent = formatCategoryName(category);

    header.appendChild(title);
    section.appendChild(header);

    /* ===== CONTENT ===== */
    if (!items || items.length === 0) {

      section.innerHTML += `<p class="coming-msg">✨ Coming Soon</p>`;

    } else {

      const grid = document.createElement("div");
      grid.className = "products";

      items.forEach(img => {

        const card = document.createElement("div");
        card.className = "product-card";

        const image = document.createElement("img");

        // ✅ FIXED (uses your folder structure)
        image.src = `images/${category}/${img}`;

        image.alt = category;
        image.loading = "lazy";

        card.appendChild(image);
        grid.appendChild(card);
      });

      section.appendChild(grid);
    }

    container.appendChild(section);
  });

  activateScrollHighlight();
}


/* ================= SCROLL ACTIVE TAB ================= */
function activateScrollHighlight() {
  const sections = document.querySelectorAll(".category");
  const tabs = document.querySelectorAll(".tab");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.id;
      }
    });

    tabs.forEach(tab => {
      tab.classList.remove("active");
      if (tab.textContent.toLowerCase() === current) {
        tab.classList.add("active");
      }
    });
  });
}


/* ================= BANNERS ================= */
// ================= CAROUSEL =================
/* ================= CAROUSEL ================= */

function loadBanners() {
  const track = document.getElementById("carouselTrack");

  if (!track || !window.banners || banners.length === 0) {
    console.log("banners missing");
    return;
  }

  track.innerHTML = "";

  // 🔥 Clone for infinite loop
  const slides = [
    banners[banners.length - 1],
    ...banners,
    banners[0]
  ];

  slides.forEach((img) => {
    const image = document.createElement("img");
    image.src = `images/banner/${img}`;
    image.loading = "lazy";
    track.appendChild(image);
  });

  let index = 1;
  let isAnimating = false;

  // Initial position
  track.style.transform = `translateX(-${index * 100}%)`;

  function moveSlide() {
    if (isAnimating) return;

    isAnimating = true;
    index++;

    track.style.transition = "transform 0.6s ease-in-out";
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  // 🔥 PERFECT LOOP HANDLING
  track.addEventListener("transitionend", () => {
    if (index === banners.length + 1) {
      track.style.transition = "none";
      index = 1;
      track.style.transform = `translateX(-${index * 100}%)`;
    }

    if (index === 0) {
      track.style.transition = "none";
      index = banners.length;
      track.style.transform = `translateX(-${index * 100}%)`;
    }

    isAnimating = false;
  });

  // 🔥 AUTO SLIDE
  let interval = setInterval(moveSlide, 2800);

  // 🔥 PAUSE ON HOVER (premium feel)
  track.addEventListener("mouseenter", () => clearInterval(interval));
  track.addEventListener("mouseleave", () => {
    interval = setInterval(moveSlide, 2800);
  });
}


/* ================= SERVICES ================= */
function loadServiceGallery() {
  console.log("Loading Service Gallery...");
  console.log("Data:", window.servicesGallery);

  const imageContainer = document.getElementById("serviceImages");
  const videoContainer = document.getElementById("serviceVideos");

  if (!window.servicesGallery) {
    console.log("❌ servicesGallery NOT FOUND");
    return;
  }

  if (imageContainer) imageContainer.innerHTML = "";
  if (videoContainer) videoContainer.innerHTML = "";

  servicesGallery.forEach(item => {
    console.log("Processing:", item);

    const card = document.createElement("div");
    card.className = "gallery-card";

    if (item.type === "image" && imageContainer) {
      const img = document.createElement("img");
      img.src = `images/services/${item.src}`;
      img.className = "gallery-media";

      img.onerror = () => console.log("❌ Image failed:", img.src);

      card.appendChild(img);
      imageContainer.appendChild(card);
    }

    if (item.type === "video" && videoContainer) {
      const video = document.createElement("video");
      video.src = `images/services/${item.src}`;
      video.controls = true;

      video.onerror = () => console.log("❌ Video failed:", video.src);

      card.appendChild(video);
      videoContainer.appendChild(card);
    }
  });
}


/* ================= INIT ================= */
document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  loadBanners();
  loadServiceGallery();
});