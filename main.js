
const apiKey = '0b97ae755635b4fb0228560ce5710f15';

// Fetch popular movies when the page loads
document.addEventListener('DOMContentLoaded', fetchPopularMovies);

// Fetch popular movies
function fetchPopularMovies() {
    const popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

    fetch(popularUrl)
        .then(response => response.json())
        .then(data => {
            displayMovies(data.results);
        })
        .catch(error => {
            console.error('Error fetching popular movies:', error);
        });
}

// Fetch movies based on search input
function fetchMovies() {
    const searchTerm = document.querySelector('#searchInput').value;
    const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchTerm)}`;

    fetch(searchUrl)
        .then(response => response.json())
        .then(data => {
            if (data.results.length > 0) {
                displayMovies(data.results);
            } else {
                alert('No movies found.');
            }
        })
        .catch(error => {
            console.error('Error fetching search results:', error);
        });
}

// Display movies in the container
function displayMovies(movies) {
    const container = document.querySelector('#movie-container');
    container.innerHTML = '';  // Clear previous movies

    movies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie-card');

        const posterPath = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'placeholder-image-url';
        const img = document.createElement('img');
        img.src = posterPath;
        img.alt = `${movie.title} Poster`;

        const title = document.createElement('h2');
        title.textContent = movie.title;

        const releaseDate = document.createElement('p');
        releaseDate.textContent = `Release Date: ${movie.release_date || 'Unknown'}`;

        const rating = document.createElement('p');
        rating.textContent = `Rating: ${movie.vote_average || 'N/A'}`;

        const favoriteButton = document.createElement('button');
        favoriteButton.textContent = 'Add to Favorites';
        favoriteButton.addEventListener('click', () => addToFavorites(movie));

        movieDiv.appendChild(img);
        movieDiv.appendChild(title);
        movieDiv.appendChild(releaseDate);
        movieDiv.appendChild(rating);
        movieDiv.appendChild(favoriteButton);

        container.appendChild(movieDiv);
    });
}

// Add movie to favorites and save to localStorage
function addToFavorites(movie) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    // Check if the movie is already in favorites
    const movieExists = favorites.some(fav => fav.id === movie.id);

    if (!movieExists) {
        favorites.push(movie);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert(`${movie.title} added to favorites!`);
    } else {
        alert(`${movie.title} is already in your favorites!`);
    }
}

// Add event listener to search button
document.querySelector('#searchButton').addEventListener('click', fetchMovies);

