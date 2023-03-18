import { useContext } from "react"
import { MoviesContext } from "../context/MoviesContext"

export const useMovieContext = () => {
  return useContext(MoviesContext);
}