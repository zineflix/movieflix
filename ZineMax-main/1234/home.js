const apiKey = 'a1e72fd93ed59f56e6332813b9f8dcae'; // Replace with your actual TMDb API key

// Function to fetch data
async function fetchMedia(url, containerId, type) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayMedia(data.results, containerId, type);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to display media items
function displayMedia(items, containerId, type) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    items.forEach(item => {
        if (!item.poster_path) return;

        const mediaItem = document.createElement('div');
        mediaItem.classList.add('media-item');

        const img = document.createElement('img');
        img.src = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
        img.alt = item.name || item.title;

        img.addEventListener('click', () => {
            if (type === 'tv') {
                window.location.href = `tvshows-details.html?id=${item.id}`;
            } else {
                window.location.href = `movie-details.html?movie_id=${item.id}`;
            }
        });

        mediaItem.appendChild(img);
        container.appendChild(mediaItem);
    });
}

// Function to fetch and set a random trending movie/TV show as a banner
async function fetchBanner() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`);
        const data = await response.json();

        if (data.results.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.results.length);
            const item = data.results[randomIndex];

            document.getElementById('banner').style.backgroundImage = `url(https://image.tmdb.org/t/p/w1280${item.backdrop_path})`;
            document.getElementById('banner').innerHTML = `
                <h1>${item.name || item.title}</h1>
                <p>⭐ ${item.vote_average.toFixed(1)} | ${item.media_type.toUpperCase()}</p>
                <p>${item.overview}</p>
            `;
        }
    } catch (error) {
        console.error('Error fetching banner:', error);
    }
}

// API Requests
fetchMedia(`https://api.themoviedb.org/3/trending/tv/week?api_key=${apiKey}&language=ko-KR&vote_count.gte=500`, 'korean-tv-shows', 'tv');
fetchMedia(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=ja-JP&with_genres=16&vote_count.gte=500`, 'japanese-animations', 'tv');
fetchMedia(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_companies=149142`, 'filipino-movies', 'movie');
fetchBanner();
