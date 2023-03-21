import BoxContainer from "../../layout/BoxContainer";
import Header from "../../components/Header";
import ButtonGroup from "../../components/ButtonGroup";
import CustomButton from "../../components/CustomButton";
import InputField from "../../components/InputField";
import ListTable from "./components/ListTable";
import { Box, Flex, HStack, Icon, Td } from "@chakra-ui/react";
import { AddIcon, StarIcon } from "@chakra-ui/icons";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

import { useFilterList } from "../../hooks/use-filter-list";
import { useMovieContext } from "../../hooks/use-movie-context";
import Pagination from "../../components/Pagination";
import { usePaginate } from "../../hooks/use-paginate";

function AdminPage() {
  const { movies } = useMovieContext();
  const { currentType, handleFilterData } = useFilterList();
  const {
    pageCount,
    handlePageClick,
    currentItems,
    setCurrentPageNumber,
    currentPageNumber,
    selectedPage,
    setSelectedPage,
  } = usePaginate(movies);

  const handleClick = (type) => {
    handleFilterData(type);
    if (currentPageNumber !== 0) {
      setCurrentPageNumber(0);
      setSelectedPage(0);
    }
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
      label: "IMDB",
      render: (item) => item.imdbID,
    },
    {
      label: "Actions",
      render: (item) => (
        <HStack spacing={4}>
          <Icon color={"cyan.600"} as={EditIcon} />
          <Icon color={"red.600"} as={DeleteIcon} />
        </HStack>
      ),
    },
  ];

  const keyFn = (item) => {
    return item.Title;
  };

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
        <InputField />
      </Header>

      {/* table */}
      <Box display="flex" mx={4} mt={4} color="cyan.500" justifyContent={"end"}>
        <CustomButton
          _hover={{
            bg: "cyan.500",
            color: "black",
          }}
          leftIcon={<AddIcon h={3} w={3} />}
          rounded
        >
          {currentType === "movie" ? "Add Movie" : "Add Series"}
        </CustomButton>
      </Box>
      <ListTable keyFn={keyFn} data={currentItems} config={config} />

      {/* Pagination */}
      <Pagination
        currentPageNumber={currentPageNumber}
        selectedPage={selectedPage}
        pageCount={pageCount}
        handlePageClick={handlePageClick}
      />
    </BoxContainer>
  );
}

export default AdminPage;
