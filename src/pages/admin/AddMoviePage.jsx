import { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  Flex,
  HStack,
  Select,
  Center,
  Text,
  useDisclosure,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import InputField from "../../components/InputField";
import BoxContainer from "../../layout/BoxContainer";
import ListTable from "./components/ListTable";
import CustomButton from "../../components/CustomButton";
import { useAdminContext } from "../../hooks/use-admin-context";
import { useMovieContext } from "../../hooks/use-movie-context";
import { capitalizeFirstLetter } from "../../utils/index";
import CustomModal from "../../components/CustomModal";
import Iframe from "../../components/Iframe";
import { useFilterList } from "../../hooks/use-filter-list";
import EmptyPage from "../../components/EmptyPage";

const options = [
  { label: "Movie", value: "movie" },
  { label: "Series", value: "series" },
];

function AddMoviePage() {
  const [title, setTitle] = useState("");
  const [imdbId, setImdbId] = useState("");
  const { findMovie, listData } = useAdminContext();
  const { movies, addMovie } = useMovieContext();
  const { handleFilterData } = useFilterList();
  const [type, setType] = useState(options[0].value);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    handleFilterData("movie");
  }, [handleFilterData, movies]);

  const config = [
    {
      label: "Title",
      render: (item) => (
        <>
          <Flex alignItems="center" columnGap={3}>
            <StarIcon color="cyan.600" /> {item.Title} ({item.Year})
          </Flex>
        </>
      ),
    },
    {
      label: "Actions",
      render: (item) => (
        <HStack spacing={4}>
          {item.Type === "movie" ? (
            <CustomButton
              onClick={() => handlePreviewStream(item)}
              size="sm"
              rounded
              color={
                handleCheckMovie(item.imdbID) ? "whiteAlpha.400" : "green.300"
              }
              isDisabled={handleCheckMovie(item.imdbID)}
            >
              Preview Stream
            </CustomButton>
          ) : (
            <CustomButton size="sm" rounded color="green.300">
              Get Seasons
            </CustomButton>
          )}

          <CustomButton
            isDisabled={handleCheckMovie(item.imdbID)}
            onClick={() => handleAddMovie(item)}
            size="sm"
            bg={handleCheckMovie(item.imdbID) ? "blackAlpha.400" : "cyan.600"}
            color={handleCheckMovie(item.imdbID) ? "whiteAlpha.400" : ""}
            rounded
          >
            {handleCheckMovie(item.imdbID) ? "Already Added" : "Add to server"}
          </CustomButton>
        </HStack>
      ),
    },
  ];

  /*=========================================== */

  const handlePreviewStream = (item) => {
    onOpen();
    setImdbId(item.imdbID);
  };

  const handleCheckMovie = (id) => {
    const result = movies.findIndex((item) => item.imdbID === id);
    return result !== -1 ? true : false;
  };

  const handleAddMovie = async (movie) => {
    if (movie) {
      await addMovie(movie);

      alert("added");
    }
  };

  /*=========================================== */

  function keyFn(item) {
    return item.imdbID;
  }

  const handleKeyChange = async (e) => {
    setTitle(e.target.value);
    if (e.key === "Enter") {
      if (!title.trim()) {
        alert(`Enter valid ${type} title!`);
        return;
      }

      const response = await findMovie(title, type);
      if (response) {
        alert(response);
      }
      setTitle("");
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert(`Enter valid ${type} title!`);
      return;
    }
    const response = await findMovie(title, type);
    if (response) {
      alert(response);
    }
    setTitle("");
  };

  return (
    <BoxContainer>
      <Header
        pageHeading="Add Movie / Series"
        pageSubHeading="Browse movie/serfies to be added"
      ></Header>

      <Box
        w={"full"}
        display="flex"
        justifyContent="end"
        flexDirection="column"
        alignContent="center"
      >
        <FormControl
          p={4}
          sx={{
            display: "flex",
            justifyContent: "end",
          }}
        >
          <Box
            display="flex"
            justifyContent={{ sm: "center", lg: "end", md: "center" }}
            flexDirection={{ md: "column", lg: "row", sm: "column" }}
            alignItems={{ sm: "center", md: "center" }}
            columnGap={2}
          >
            <InputField
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => handleKeyChange(e)}
              sx={{
                marginRight: "0",
              }}
            />

            <HStack mt={{ md: "12px", sm: "12px", lg: "0" }}>
              <Select
                color="white"
                w={"150px"}
                borderColor="cyan.400"
                variant="outline"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                {options.map((listOption) => {
                  return (
                    <option key={listOption.value} value={listOption.value}>
                      {listOption.label}
                    </option>
                  );
                })}
              </Select>

              <CustomButton
                onClick={handleSearchSubmit}
                bg="cyan.600"
                color="blackAlpha.900"
                rounded
              >
                Search {capitalizeFirstLetter(type)}
              </CustomButton>
            </HStack>
          </Box>
        </FormControl>

        {/* table */}

        {listData.length === 0 ? (
          <EmptyPage message={"Populate Data in the Search Box!"} />
        ) : (
          <ListTable keyFn={keyFn} data={listData} config={config} />
        )}
      </Box>

      {/* MODAL */}
      <CustomModal
        size={{ md: "md", lg: "6xl", sm: "sm" }}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalBody pb={6}>
          <Box height={{ lg: "4xl" }}>
            <Iframe src={imdbId} />
          </Box>
        </ModalBody>
        <ModalFooter>
          <CustomButton onClick={onClose} rounded bg="cyan.600">
            Close
          </CustomButton>
        </ModalFooter>
      </CustomModal>
    </BoxContainer>
  );
}

export default AddMoviePage;
