const apiKey = "a1e72fd93ed59f56e6332813b9f8dcae";
const baseURL = "https://api.themoviedb.org/3";
const imgURL = "https://image.tmdb.org/t/p/w500";

// Fetch Random Banner
async function fetchBanner() {
    const response = await fetch(`${baseURL}/trending/all/week?api_key=${apiKey}&language=en-US`);
    const data = await response.json();
    const item = data.results[Math.floor(Math.random() * data.results.length)];

    document.querySelector(".banner").style.backgroundImage = `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`;
    document.getElementById("banner-title").textContent = item.title || item.name;
    document.getElementById("banner-description").textContent = item.overview || "No description available.";
    document.getElementById("banner-date").textContent = `Release Date: ${item.release_date || item.first_air_date || "N/A"}`;
}

// Fetch Media Rows
async function fetchMedia(url, containerId, type) {
    const response = await fetch(url);
    const data = await response.json();
    const container = document.getElementById(containerId);
    
    data.results.forEach(item => {
        const mediaItem = document.createElement("div");
        mediaItem.classList.add("media-item");
        mediaItem.innerHTML = `<img src="${imgURL + item.poster_path}" alt="${item.title || item.name}">`;
        mediaItem.addEventListener("click", () => {
            window.location.href = type === "movie" 
                ? `movie-details.html?movie_id=${item.id}`
                : `tvshows-details.html?id=${item.id}`;
        });

        container.appendChild(mediaItem);
    });
}

// Load Data
fetchBanner();
fetchMedia(`${baseURL}/discover/movie?api_key=${apiKey}&vote_count.gte=500&vote_average=10`, "popular-movies", "movie");
fetchMedia(`${baseURL}/discover/tv?api_key=${apiKey}&vote_count.gte=10000&vote_average=10`, "popular-tv-shows", "tv");
fetchMedia(`${baseURL}/discover/tv?api_key=${apiKey}&with_origin_country=KR&vote_count.gte=500`, "korean-tv-shows", "tv");
fetchMedia(`${baseURL}/discover/tv?api_key=${apiKey}&with_origin_country=JP&with_genres=16&vote_count.gte=500`, "japanese-animations", "tv");
fetchMedia(`${baseURL}/discover/movie?api_key=${apiKey}&with_companies=149142`, "philippine-movies", "movie");


// Ensure the function is globally accessible
document.addEventListener("DOMContentLoaded", function () {
    function scrollLeft(containerId) {
        let container = document.getElementById(containerId);
        if (container) {
            container.scrollBy({ left: -300, behavior: "smooth" });
        } else {
            console.error("Container not found:", containerId);
        }
    }

    function scrollRight(containerId) {
        let container = document.getElementById(containerId);
        if (container) {
            container.scrollBy({ left: 300, behavior: "smooth" });
        } else {
            console.error("Container not found:", containerId);
        }
    }

    // Attach event listeners to buttons (instead of inline HTML)
    document.querySelectorAll(".scroll-left").forEach(button => {
        button.addEventListener("click", function () {
            let targetId = this.nextElementSibling.id;
            scrollLeft(targetId);
        });
    });

    document.querySelectorAll(".scroll-right").forEach(button => {
        button.addEventListener("click", function () {
            let targetId = this.previousElementSibling.id;
            scrollRight(targetId);
        });
    });
});



// For Responsive Header
window.addEventListener("scroll", function () {
    let nav = document.querySelector("nav");
    if (window.scrollY > 50) {
        nav.classList.add("nav-solid"); // Solid color after scrolling down
    } else {
        nav.classList.remove("nav-solid"); // Transparent at the top
    }
});

// For sticky header when scrolling
    window.addEventListener("scroll", function () {
      let nav = document.querySelector("nav");
      if (window.scrollY > 50) {
        nav.classList.add("nav-solid"); // Add solid background when scrolled
      } else {
        nav.classList.remove("nav-solid"); // Remove solid background at top
      }
    });

    // Toggle menu visibility when menu button is clicked
document.getElementById("menu-btn").addEventListener("click", function() {
    document.getElementById("menu").classList.toggle("active");
});
