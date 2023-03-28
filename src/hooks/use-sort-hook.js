import { useCallback, useEffect, useState } from "react";
import { useMovieContext } from "./use-movie-context";

export const useSortHook = (listArr, sortedValueConfig) => {
  const [sortBy, setSortBy] = useState("desc");
  const { movies } = useMovieContext();

  useEffect(() => {
    setSortBy("desc");
  }, [movies]);

  const sortedList = [...listArr].sort((a, b) => {
    const reverseSort = sortBy === "asc" ? 1 : -1;
    const valueA = sortedValueConfig(a);
    const valueB = sortedValueConfig(b);

    if (typeof valueA === "string") {
      return valueA.localeCompare(valueB) * reverseSort;
    } else {
      return (valueA - valueB) * reverseSort;
    }
  });

  const onChangeSort = useCallback(
    (sortValue) => {
      if (sortValue === sortBy) {
        return;
      }
      setSortBy(sortValue);
    },
    [sortBy]
  );

  return { sortedList, sortBy, onChangeSort };
};
