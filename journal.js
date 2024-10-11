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
      movieCard.classList.add(
        "basis-1/5",
        "container",
        "max-auto",
        "px-3",
        "bg-gray-500",
        "m-3",
        "p-3"
      );
      const moviePoster = document.createElement("img");
      moviePoster.src = imgUrl + data.poster_path;
      moviePoster.alt = data.title;
      const movieObj = {
    id: crypto.randomUUID(),
    title: data.title,
    info: data.overview,
    image: data.poster_path,
    notes: "",
  };
      storeMockFavourites(movieObj);
      //localStorage.clear();
      movieCard.appendChild(moviePoster);

      const addNotesBtn = document.createElement("button");
      addNotesBtn.classList.add(
        "bg-black",
        "text-yellow-200",
        "p-1",
        "rounded-full",
        "text-xs"
      );
      addNotesBtn.textContent = "Add Notes";
      movieCard.appendChild(addNotesBtn);
      const movieTitle = document.createElement("h3");
      movieTitle.classList.add("text-xs");
      movieTitle.innerText = data.overview;
      movieCard.appendChild(movieTitle);
      addNotesBtn.addEventListener("click", () => {
        window.prompt(
          "Please add your notes about your favourite movie: " +
            moviePoster.alt +
            " here:",
          "your notes"
        );
      });
    }
  })
  .catch((err) => console.error(err));
const imgUrl = "https://image.tmdb.org/t/p/w500";
const movieList = document.querySelector("#movie-list");
//function to store mock favourite movies in local storage, which would be coming from favorite movies selected in home page

const storeMockFavourites = (
  obj
) => {
  // const movieObj = {
  //   id: movie_id,
  //   title: movie_name,
  //   info: movie_info,
  //   image: movie_imageUrl,
  //   notes: "",
  // };
  const mockFavouriteMovie = JSON.parse(localStorage.getItem("MyFavourites")) || [];
  console.log(mockFavouriteMovie);
  
  mockFavouriteMovie.push(obj);
  localStorage.setItem("MyFavourites", JSON.stringify(mockFavouriteMovie));
};
