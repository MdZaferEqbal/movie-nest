const APILINK = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=46ab4985448518009fe1f1d360eda44d&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?sort_by=popularity.desc&api_key=46ab4985448518009fe1f1d360eda44d&query=";

const form = document.getElementById('form');
const query = document.getElementById('query');
const movieList = document.getElementById('movie-list');

returnMovies(APILINK);

function returnMovies(url) {
    fetch(url).then(res => res.json()).then(function(data) {
        data.results.forEach(result => {
            const div_card = document.createElement("div");
            div_card.classList.add("card");

            if ( window.matchMedia("(pointer: coarse)").matches ) {
                div_card.classList.remove("card--hover");
            } else {
                div_card.classList.add("card--hover");
            }

            const img = document.createElement("img");
            img.classList.add("thumbnail");
            img.alt = "Movie Poster";
            img.src = IMG_PATH + result.poster_path;

            const movieTitle = document.createElement("h3");
            movieTitle.classList.add("movie-title");
            movieTitle.innerText = result.title;

            const movieReleaseDate = document.createElement("h5");
            movieReleaseDate.classList.add("movie-release-date");
            movieReleaseDate.innerText = result.release_date;

            const movieLink = document.createElement("a");
            movieLink.classList.add("movie-link");
            movieLink.target = "_blank";
            movieLink.href = "https://www.google.com/search?q=" + result.title;

            div_card.appendChild(movieLink);
            movieLink.appendChild(img);
            movieLink.appendChild(movieTitle);
            movieLink.appendChild(movieReleaseDate);

            movieList.appendChild(div_card);
        });
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    movieList.innerHTML = "";

    if ( query.value ) {
        const queryUrl = SEARCHAPI + query.value;
        returnMovies(queryUrl);
    } else {
        returnMovies(APILINK);
    }
});

function refreshPage() {
    location.reload();
}
