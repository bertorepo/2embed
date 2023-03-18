import { getAllMovies } from "../api/movie-api";

const { createContext, useState, useCallback } = require("react");


const MoviesContext = createContext()

function MoviesContextProvider({ children }) {
  
  const [movies, setMovies] = useState([]);

  // get all movies
  const fetchedAllMovies= useCallback( async() => {
    const response = await getAllMovies();
    setMovies(response.data)
  }, [])
 
  
  const config = {
    movies,
    fetchedAllMovies
  }

  return (
    <MoviesContext.Provider value={config}>
      {children}
    </MoviesContext.Provider>
  )
}

export { MoviesContext }
export default MoviesContextProvider;