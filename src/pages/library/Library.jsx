import { useEffect } from "react";
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
import { useSearchTitle } from "../../hooks/use-search-title";
import { useSortHook } from "../../hooks/use-sort-hook";
import CustomSelect from "../../components/CustomSelect";
import { Box } from "@chakra-ui/react";

function Library() {
  const { handleFilterData, currentType } = useFilterList();
  const { isLoading } = useLoader();
  const { movies } = useMovieContext();

  // =====sort

  const sortOptions = [
    {
      label: "Latest",
      value: "desc",
    },
    {
      label: "Oldest",
      value: "asc",
    },
  ];
  const sortValueConfig = (movie) => movie.Year;

  const { sortedList, onChangeSort, sortBy } = useSortHook(
    movies,
    sortValueConfig
  );

  // ====== end sort

  const {
    currentItems,
    pageCount,
    selectedPage,
    setSelectedPage,
    handlePageClick,
    setCurrentPageNumber,
  } = usePaginate(sortedList, 20);

  const { handleSearch, handleOnChangeTitle, searchTitle } = useSearchTitle();

  useEffect(() => {
    setCurrentPageNumber(0);
    setSelectedPage(0);
  }, [movies, setCurrentPageNumber, setSelectedPage]);

  // listen for new movies arr
  // change into desc by default

  return (
    <BoxContainer>
      <Header
        display="flex"
        alignItems={{ sm: "center", xxl: "center" }}
        justifyContent={"space-between"}
        gap={4}
        flexWrap="wrap"
        alignContent="center"
        pageHeading="Library"
        pageSubHeading="Latest Movies and Tv Shows"
      >
        <ButtonGroup my={{ sm: 4 }}>
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

        {/* sortby */}
        <Box display="flex" gap={4} alignItems="center">
          <CustomSelect
            options={sortOptions}
            value={sortBy}
            onChange={(e) => onChangeSort(e.target.value)}
          />

          {/* search */}
          <InputField
            w={"full"}
            type="text"
            value={searchTitle}
            onChange={(e) => handleOnChangeTitle(e)}
            onKeyDown={(e) => handleSearch(e, currentType)}
            placeholder={`Search ${currentType}`}
          />
        </Box>
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
