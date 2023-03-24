import axios from "axios";
import { MAIN_URL, OMDB_URL, API_KEY } from "./constants";

export const getAllMovies = async () => {
  const results = await axios.get(`${MAIN_URL}/movies`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return results;
};

export const filterDataByType = async (type) => {
  const response = await axios.get(`${MAIN_URL}/movies`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data.filter((resp) => resp.Type === type);
};

// get movie in the server

export const checkIfExisted = async (imdb) => {
  const response = await getAllMovies();

  const filterResult = await response.data.filter(
    (item) => item.imdbID === imdb
  );

  return filterResult.length !== 0 ? true : false;
};

export const getMovieDetailsById = async (imdbId) => {
  const response = await axios.get(`${OMDB_URL}/`, {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      apikey: API_KEY,
      i: imdbId,
      plot: "full",
    },
  });

  return response;
};

// ADMIN callbacks
export const searchMovie = async (title, type = "movie") => {
  const response = await axios.get(`${OMDB_URL}/`, {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      apikey: API_KEY,
      type: type === "movie" ? "movie" : "series",
      s: title.toLowerCase(),
    },
  });

  return response;
};

export const addMovieToServer = async (movie) => {
  const results = await axios.post(`${MAIN_URL}/movies`, movie, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return results;
};

export const getSeries = async (imdb) => {
  const results = await axios.get(`${OMDB_URL}`, {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      apikey: API_KEY,
      i: imdb,
      type: "series",
      plot: "short",
    },
  });

  return results;
};

export const getAllEpisodesByImdb = async (imdb, currentSeason) => {
  const response = await axios.get(`${OMDB_URL}`, {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      apikey: API_KEY,
      i: imdb,
      Season: currentSeason,
    },
  });

  return response;
};
