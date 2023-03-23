import {
  getAllMovies,
  filterDataByType,
  getMovieDetailsById,
  addMovieToServer,
  getSeries,
  checkIfExisted,
} from "../api/movie-api";

const { createContext, useState, useCallback, useMemo } = require("react");

const MoviesContext = createContext();

function MoviesContextProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);

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

  const addMovie = useCallback(
    async (movie) => {
      const result = await addMovieToServer(movie);
      setMovies([...movies, result]);
      setIsDisabled(true);
    },
    [movies]
  );

  const fetchSeries = useCallback(async (imdb) => {
    const results = await getSeries(imdb);
    if (!results) {
      return "error";
    }

    return results.data;
  }, []);

  const checkMovieById = useCallback(async (imdb) => {
    const result = await checkIfExisted(imdb);
    setIsDisabled(result);
  }, []);

  const config = {
    movies,
    fetchedAllMovies,
    filterData,
    fetchDetails,
    addMovie,
    fetchSeries,
    checkMovieById,
    isDisabled,
  };

  return (
    <MoviesContext.Provider value={config}>{children}</MoviesContext.Provider>
  );
}

export { MoviesContext };
export default MoviesContextProvider;
