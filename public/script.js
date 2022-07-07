
import { populateGenreDropdown, getSelectedGenre, getRandomMovie, displayMovie, clearCurrentMovie, displayMovieCast } from "./helpers.js";
const tmdbKey = "1c676b61f22a87367d76a5a1856be3ce";
const tmdbBaseUrl = "https://api.themoviedb.org/3";
const playBtn = document.getElementById("playBtn");

const getGenres = async () => {
  const genreRequestEndpoint = "/genre/movie/list";
  const requestParams = `?api_key=${tmdbKey}`;
  let urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;
  try {
    let response = await fetch(urlToFetch);
    if (response.ok) {
      let jsonResponse = await response.json();
      // console.log(jsonResponse)
      let genres = jsonResponse.genres;
      return genres;
    }
  } catch (error) {
    console.log(error);
  }
};

const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = "/discover/movie";
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
  let urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;
  try {
    let response = await fetch(urlToFetch);
    if (response.ok) {
      let jsonResponse = await response.json();
      // console.log(jsonResponse);
      const movies = jsonResponse.results;
      // console.log(movies)
      return movies;
    }
  } catch (error) {
    console.log(error.message);
  }
};
// getMovies()

const getMovieInfo = async (movie) => {
  const movieId = movie.id;
  const getMovieInfoEndpoint = `/movie/${movieId}`;
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${getMovieInfoEndpoint}${requestParams}`;
  try {
    let response = await fetch(urlToFetch);
    if (response.ok) {
      let jsonResponse = await response.json();
      // console.log(jsonResponse)
      return jsonResponse;
    }
  } catch (error) {
    console.log(error.message);
  }
};

const getMovieCast = async (movie) => {
  const movieId = movie.id
  const getMovieCastEndpoint = `/movie/${movieId}/credits`;
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${getMovieCastEndpoint}${requestParams}`;
  try {
    let response = await fetch(urlToFetch);
    if(response.ok){
      let jsonResponse = await response.json();
      let cast = jsonResponse.cast
      return cast
    }
  } catch (error) {
    console.log(error.message)
  }
}
// Gets a list of movies and ultimately displaysthe info of a random movie from the list
export const showRandomMovie = async () => {
  const movieInfo = document.getElementById("movieInfo");
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  }
  let movies = await getMovies();
  let randomMovie = getRandomMovie(movies);
  let info = await getMovieInfo(randomMovie);
  let movieCast = await getMovieCast(randomMovie)
  // console.log(movieCast)
  displayMovie(info);
  displayMovieCast(movieCast)
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;
