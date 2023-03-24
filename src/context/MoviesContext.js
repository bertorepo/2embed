import {
  getAllMovies,
  filterDataByType,
  getMovieDetailsById,
  addMovieToServer,
  getSeries,
  checkIfExisted,
  getAllEpisodesByImdb,
  addEpisode,
  getAllSeasons,
} from "../api/movie-api";

const { createContext, useState, useCallback, useMemo } = require("react");

const MoviesContext = createContext();

function MoviesContextProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [currentEpisodes, setCurrentEpisodes] = useState([]);
  const [seasonsList, setSeasonsList] = useState([]);

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

  const fetchAllEpisodes = useCallback(async (imdb, currentSeason) => {
    const results = await getAllEpisodesByImdb(imdb, currentSeason);
    setCurrentEpisodes(results.data.Episodes);
  }, []);

  const fetchAllSeasons = useCallback(async () => {
    const results = await getAllSeasons();
    setSeasonsList(results.data);
  }, []);

  const appendEpisode = useCallback(async (currentEpisode) => {
    await addEpisode(currentEpisode);
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
    fetchAllEpisodes,
    currentEpisodes,
    appendEpisode,
    fetchAllSeasons,
    seasonsList,
  };

  return (
    <MoviesContext.Provider value={config}>{children}</MoviesContext.Provider>
  );
}

export { MoviesContext };
export default MoviesContextProvider;
