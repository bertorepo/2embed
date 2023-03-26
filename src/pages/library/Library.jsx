import CustomButton from "../../components/CustomButton";
import InputField from "../../components/InputField";
import Loader from "../../components/Loader";
import useLoader from "../../hooks/use-loader";
import BoxContainer from "../../layout/BoxContainer";
import CardsList from "./CardsList";
import Header from "../../components/Header";
import ButtonGroup from "../../components/ButtonGroup";
import { useFilterList } from "../../hooks/use-filter-list";
import { useMovieContext } from "../../hooks/use-movie-context";
import { usePaginate } from "../../hooks/use-paginate";
import Pagination from "../../components/Pagination";
import { useEffect } from "react";

function Library() {
  const { handleFilterData, currentType } = useFilterList();
  const { isLoading } = useLoader();
  const { movies } = useMovieContext();
  const {
    currentItems,
    pageCount,
    selectedPage,
    setSelectedPage,
    handlePageClick,
    setCurrentPageNumber,
  } = usePaginate(movies, 20);

  useEffect(() => {
    setCurrentPageNumber(0);
    setSelectedPage(0);
  }, [movies, setCurrentPageNumber, setSelectedPage]);

  return (
    <BoxContainer>
      <Header pageHeading="Library" pageSubHeading="Latest Movies and Tv Shows">
        <ButtonGroup>
          <CustomButton
            isActive={currentType === "movie" ? true : false}
            rounded
            onClick={() => handleFilterData("movie")}
            color="gray.500"
          >
            Movies
          </CustomButton>
          <CustomButton
            isActive={currentType === "series" ? true : false}
            onClick={() => handleFilterData("series")}
            bg={"gray.900"}
            rounded
            color="gray.500"
          >
            TV Shows
          </CustomButton>
        </ButtonGroup>

        {/* search */}
        <InputField />
      </Header>
      {/* display list of movies / shows */}

      {isLoading ? <Loader /> : <CardsList movies={currentItems} />}

      {pageCount !== 1 && (
        <Pagination
          pageCount={pageCount}
          handlePageClick={handlePageClick}
          selectedPage={selectedPage}
        />
      )}
    </BoxContainer>
  );
}

export default Library;
