import BoxContainer from "../../layout/BoxContainer";
import Header from "../../components/Header";
import ButtonGroup from "../../components/ButtonGroup";
import CustomButton from "../../components/CustomButton";
import InputField from "../../components/InputField";
import ListTable from "./components/ListTable";
import { Box, Flex, HStack } from "@chakra-ui/react";
import { AddIcon, StarIcon } from "@chakra-ui/icons";
import { useFilterList } from "../../hooks/use-filter-list";
import { useMovieContext } from "../../hooks/use-movie-context";
import Pagination from "../../components/Pagination";
import { usePaginate } from "../../hooks/use-paginate";
import { Link } from "react-router-dom";
import EmptyPage from "../../components/EmptyPage";
import useLoader from "../../hooks/use-loader";
import Loader from "../../components/Loader";
import { useSearchTitle } from "../../hooks/use-search-title";

function AdminPage() {
  const { movies, deleteMovieOrEpisode, filterData } = useMovieContext();
  const { currentType, handleFilterData } = useFilterList();
  const { isLoading } = useLoader();

  const {
    pageCount,
    handlePageClick,
    currentItems,
    setCurrentPageNumber,
    currentPageNumber,
    selectedPage,
    setSelectedPage,
  } = usePaginate(movies);

  const { handleSearch, searchTitle, handleOnChangeTitle } = useSearchTitle();

  const handleClick = (type) => {
    handleFilterData(type);
    if (currentPageNumber !== 0) {
      setCurrentPageNumber(0);
      setSelectedPage(0);
    }
  };

  const handleDeleteMovie = async (id, type, imdbId) => {
    await deleteMovieOrEpisode(id, type, imdbId);
    await filterData(currentType);
    alert("Deleted Successfully!");
  };

  const config = [
    {
      label: "Title",
      render: (item) => (
        <>
          <Flex alignItems="center" columnGap={3}>
            <StarIcon color="cyan.600" /> {item.Title}
          </Flex>
        </>
      ),
    },
    {
      label: "Actions",
      render: (item) => (
        <HStack spacing={4}>
          <CustomButton
            onClick={() => handleDeleteMovie(item.id, item.Type, item.imdbID)}
            bg="red.500"
            rounded
            size={"sm"}
          >
            Delete
          </CustomButton>
        </HStack>
      ),
    },
  ];

  const keyFn = (item) => {
    return item.Title;
  };

  const loadDataPage = isLoading ? (
    <Loader />
  ) : (
    <>
      <ListTable keyFn={keyFn} data={currentItems} config={config} />

      {pageCount !== 1 && (
        <Pagination
          currentPageNumber={currentPageNumber}
          selectedPage={selectedPage}
          pageCount={pageCount}
          handlePageClick={handlePageClick}
        />
      )}
    </>
  );

  return (
    <BoxContainer>
      <Header pageHeading="Admin Area" pageSubHeading="Manage Movies and Shows">
        <ButtonGroup>
          <CustomButton
            isActive={currentType === "movie" ? true : false}
            onClick={() => handleClick("movie")}
            rounded
            color="gray.500"
          >
            Movies
          </CustomButton>
          <CustomButton
            isActive={currentType === "series" ? true : false}
            onClick={() => handleClick("series")}
            rounded
            color="gray.500"
          >
            Series
          </CustomButton>
        </ButtonGroup>

        {/* use for search */}
        <InputField
          type="text"
          value={searchTitle}
          onChange={(e) => handleOnChangeTitle(e)}
          onKeyDown={(e) => handleSearch(e, currentType)}
          placeholder={`Search ${currentType}`}
        />
      </Header>

      {/* table */}
      <Box display="flex" mx={4} mt={4} color="cyan.500" justifyContent={"end"}>
        <Link to="/admin/add">
          <CustomButton
            _hover={{
              bg: "cyan.500",
              color: "black",
            }}
            leftIcon={<AddIcon h={3} w={3} />}
            rounded
          >
            Add Movie/Series
          </CustomButton>
        </Link>
      </Box>

      {currentItems.length === 0 ? <EmptyPage /> : loadDataPage}
    </BoxContainer>
  );
}

export default AdminPage;
