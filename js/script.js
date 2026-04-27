/* ================= PRODUCTS ================= */

function loadProducts() {
    const container = document.getElementById("productContainer");
    if (!container || !products) return;
  
    container.innerHTML = "";
  
    for (let category in products) {
  
      let section = document.createElement("div");
      section.className = "category";
  
      let title = document.createElement("h3");
      title.innerText = formatCategoryName(category);
      section.appendChild(title);
  
      // 🔍 EMPTY CATEGORY
      if (!products[category] || products[category].length === 0) {
  
        let coming = document.createElement("p");
        coming.className = "coming-msg";
        coming.innerText = "✨ Coming Soon";
  
        section.appendChild(coming);
  
      } else {
  
        let productDiv = document.createElement("div");
        productDiv.className = "products";
  
        products[category].forEach(img => {
  
          let card = document.createElement("div");
          card.className = "product-card";
  
          let image = document.createElement("img");
  
          // ✅ Correct path
          image.src = `images/${category}/${img}`;
          image.alt = category;
  
          let overlay = document.createElement("div");
          overlay.className = "product-overlay";
          overlay.innerText = formatCategoryName(category);
  
          card.appendChild(image);
          card.appendChild(overlay);
  
          productDiv.appendChild(card);
        });
  
        section.appendChild(productDiv);
      }
  
      container.appendChild(section);
    }
  }
  
  /* ================= BANNERS ================= */
  
  function loadBanners() {
    const track = document.getElementById("carouselTrack");
    if (!track || !banners) return;
  
    track.innerHTML = "";
  
    banners.forEach(img => {
      let image = document.createElement("img");
  
      // ✅ Adjusted for your folder: images/banner/
      image.src = `images/banner/${img}`;
      image.alt = "banner";
  
      // Debug (remove later)
      console.log("Banner loaded:", image.src);
  
      track.appendChild(image);
    });
  }
  
  /* ================= SERVICES GALLERY ================= */
  
  function loadServiceGallery() {
    const imageContainer = document.getElementById("serviceImages");
    const videoContainer = document.getElementById("serviceVideos");
  
    if (!servicesGallery) return;
  
    if (imageContainer) imageContainer.innerHTML = "";
    if (videoContainer) videoContainer.innerHTML = "";
  
    servicesGallery.forEach(item => {
  
      let card = document.createElement("div");
      card.className = "gallery-card";
  
      if (item.type === "image" && imageContainer) {
        let img = document.createElement("img");
        img.src = `images/services/${item.src}`;
        img.alt = "service image";
        card.appendChild(img);
        imageContainer.appendChild(card);
      }
  
      if (item.type === "video" && videoContainer) {
        let video = document.createElement("video");
        video.src = `videos/${item.src}`;
        video.controls = true;
        video.muted = true;
        video.loop = true;
        card.appendChild(video);
        videoContainer.appendChild(card);
      }
  
    });
  }
  
  /* ================= HELPER ================= */
  
  function formatCategoryName(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
  
  /* ================= INIT (IMPORTANT FIX) ================= */
  
  window.addEventListener("DOMContentLoaded", () => {
    loadProducts();
    loadBanners();
    loadServiceGallery();
  });