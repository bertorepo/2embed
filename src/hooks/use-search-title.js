import { useState } from "react";
import { useMovieContext } from "./use-movie-context";

export const useSearchTitle = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const { handleSearchTitle } = useMovieContext();

  const handleOnChangeTitle = (e) => {
    setSearchTitle(e.target.value);
  };

  const handleSearch = async (e, currentType) => {
    if (e.key === "Enter") {
      if (!searchTitle.trim()) {
        alert("Enter valid title!");
        return;
      }
      await handleSearchTitle(searchTitle.toLowerCase(), currentType);
      setSearchTitle("");
    }
  };

  return {
    handleSearch,
    handleOnChangeTitle,
    searchTitle,
  };
};
