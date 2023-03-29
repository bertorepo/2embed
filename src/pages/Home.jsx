import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";
import useLoader from "../hooks/use-loader";
import { useMovieContext } from "../hooks/use-movie-context";
import { usePaginate } from "../hooks/use-paginate";
import BoxContainer from "../layout/BoxContainer";
import CardsList from "./library/CardsList";
import { useSortHook } from "../hooks/use-sort-hook";

const sortedValueConfig = (movie) => movie.Year;

function Home() {
  const { movies, fetchedAllMovies } = useMovieContext();
  const { isLoading } = useLoader();
  const { sortedList } = useSortHook(movies, sortedValueConfig);
  const { currentItems, handlePageClick, pageCount, selectedPage } =
    usePaginate(sortedList, 20);

  useEffect(() => {
    const runEffect = async () => {
      await fetchedAllMovies();
    };

    runEffect();
  }, [fetchedAllMovies]);

  return (
    <BoxContainer mt={5}>
      <Box mt={8}>
        {isLoading ? <Loader /> : <CardsList movies={currentItems} />}

        {pageCount !== 1 && (
          <Pagination
            pageCount={pageCount}
            handlePageClick={handlePageClick}
            selectedPage={selectedPage}
          />
        )}
      </Box>
    </BoxContainer>
  );
}

export default Home;
