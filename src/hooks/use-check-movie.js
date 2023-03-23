import { isDisabled } from "@testing-library/user-event/dist/utils";
import { useCallback, useEffect, useState } from "react";
import { useFilterList } from "./use-filter-list";
import { useMovieContext } from "./use-movie-context";

export const useCheckMovie = (imdb, type = "movie") => {
  const [isDisabled, setIsDisabled] = useState(null);
  const {} = useMovieContext();
  const { handleFilterData } = useFilterList();

  useEffect(() => {
    handleFilterData(type);
  }, [type, imdb, handleFilterData]);

  const handleOnChange = () => {
    setIsDisabled(!isDisabled);
    alert(isDisabled);
  };

  return { isDisabled, handleOnChange };
};
