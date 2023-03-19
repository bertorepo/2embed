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
