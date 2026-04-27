/* PRODUCTS */
function loadProducts() {
    const container = document.getElementById("productContainer");
  
    for (let category in products) {
      let section = document.createElement("div");
      section.className = "category";
  
      let title = document.createElement("h3");
      title.innerText = category.toUpperCase();
  
      let productDiv = document.createElement("div");
      productDiv.className = "products";
  
      products[category].forEach(img => {
        let image = document.createElement("img");
        image.src = `images/${category}/${img}`;
        productDiv.appendChild(image);
      });
  
      section.appendChild(title);
      section.appendChild(productDiv);
      container.appendChild(section);
    }
  }
  
  /* VIDEOS WITH PAGINATION */
  const videosPerPage = 4;
  let currentPage = 1;
  
  function loadVideos() {
    const container = document.getElementById("videoContainer");
    container.innerHTML = "";
  
    const start = (currentPage - 1) * videosPerPage;
    const end = start + videosPerPage;
  
    videoList.slice(start, end).forEach(videoFile => {
      let video = document.createElement("video");
      video.src = `videos/${videoFile}`;
      video.controls = true;
      video.className = "video-card";
  
      container.appendChild(video);
    });
  
    document.getElementById("pageNumber").innerText = currentPage;
    document.getElementById("prevBtn").disabled = currentPage === 1;
    document.getElementById("nextBtn").disabled =
      currentPage * videosPerPage >= videoList.length;
  }
  
  function nextPage() {
    currentPage++;
    loadVideos();
  }
  
  function prevPage() {
    currentPage--;
    loadVideos();
  }
  
  window.onload = () => {
    loadProducts();
    loadVideos();
  };