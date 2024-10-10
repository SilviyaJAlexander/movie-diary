const url = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNTY2NjlkN2VmOTA0YzVjOWZmYzA3MzQzYTBjZTg1YyIsIm5iZiI6MTcyODQ2MDQxMS4xOTc2NDEsInN1YiI6IjY3MDNjZTkwN2NmZWE2ZjIwMjczZTk5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.c-7mMjkwB4dbMbYkG-d4Q6HCkS8ajlik2jwpJFHPVrI",
  },
};

fetch(url, options)
  .then((response) => response.json())
  .then((response) => {
    console.log(response);
    for (const data of response.results) {
      const movieCard = document.createElement("div");
      movieList.appendChild(movieCard);
      movieCard.classList.add("basis-28","container","max-auto","py-3");
      const moviePoster = document.createElement("img");
      moviePoster.src = imgUrl + data.poster_path; 
      moviePoster.alt = data.title;
      //moviePoster.height = 100;
      movieCard.appendChild(moviePoster);
    }
  })
  .catch((err) => console.error(err));
const imgUrl = "https://image.tmdb.org/t/p/w500";
const movieList = document.querySelector("#movie-list");
