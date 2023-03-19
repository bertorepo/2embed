import {
  getAllMovies,
  filterDataByType,
  getMovieDetailsById,
} from "../api/movie-api";

const { createContext, useState, useCallback } = require("react");

const MoviesContext = createContext();

function MoviesContextProvider({ children }) {
  const [movies, setMovies] = useState([]);

  // get all movies
  const fetchedAllMovies = useCallback(async () => {
    const response = await getAllMovies();
    setMovies(response.data);
  }, []);

  // filter data type
  const filterData = useCallback(async (type) => {
    const results = await filterDataByType(type);
    setMovies(results);
  }, []);

  const fetchDetails = useCallback(async (imdbId) => {
    const results = await getMovieDetailsById(imdbId);
    if (results) {
      return results.data;
    }
  }, []);

  const config = {
    movies,
    fetchedAllMovies,
    filterData,
    fetchDetails,
  };

  return (
    <MoviesContext.Provider value={config}>{children}</MoviesContext.Provider>
  );
}

export { MoviesContext };
export default MoviesContextProvider;
