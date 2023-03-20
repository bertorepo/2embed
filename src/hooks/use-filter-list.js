import { useState, useMemo } from "react";
import { useMovieContext } from "./use-movie-context";

export const useFilterList = (type = "movie") => {
  const [currentType, setCurrentType] = useState(type);
  const { filterData } = useMovieContext();

  useMemo(() => {
    filterData(currentType);
  }, [currentType, filterData]);

  const handleFilterData = (type) => {
    // this will prevent from fetchinf from server again if current type is
    // the same as type argument
    if (currentType && currentType === type) {
      return;
    }

    if (type) {
      setCurrentType(type);
    }
  };

  return { currentType, handleFilterData };
};
