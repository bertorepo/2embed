import { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  Flex,
  HStack,
  Select,
  useDisclosure,
  ModalBody,
  ModalFooter,
  Text,
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
import useLoader from "../../hooks/use-loader";
import { capitalizeFirstLetter } from "../../utils/index";
import CustomModal from "../../components/CustomModal";
import Iframe from "../../components/Iframe";

import EmptyPage from "../../components/EmptyPage";
import Loader from "../../components/Loader";
import CustomSelect from "../../components/CustomSelect";

const options = [
  { label: "Movie", value: "movie" },
  { label: "Series", value: "series" },
];

function AddMoviePage() {
  const [title, setTitle] = useState("");
  const [imdbId, setImdbId] = useState("");
  const { findMovie, listData } = useAdminContext();
  const { addMovie, movies, fetchedAllMovies } = useMovieContext();
  const [type, setType] = useState(options[0].value);
  const { isLoading } = useLoader();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const runEffect = async () => {
      await fetchedAllMovies();
    };

    runEffect();
  }, [fetchedAllMovies]);

  const filteredListData = listData.map((item) => {
    const checkMovie = movies.findIndex(
      (movie) => movie.imdbID === item.imdbID
    );
    if (checkMovie !== -1) {
      return { ...item, isAdded: true };
    }
    return item;
  });

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
            <>
              <CustomButton
                onClick={() => handlePreviewStream(item)}
                size="sm"
                rounded
                color={item.isActive ? "blackAlpha.600" : "green.300"}
                isDisabled={item.isAdded ? true : false}
                bg={item.isActive && "cyan.600"}
              >
                Preview Stream
              </CustomButton>
              <CustomButton
                onClick={() => handleAddMovie(item)}
                size="sm"
                bg={item.isActive && "cyan.600"}
                rounded
                isDisabled={item.isAdded ? true : false}
              >
                {item.isAdded ? "Added Already" : "Add to Server"}
              </CustomButton>
            </>
          ) : (
            <CustomButton size="sm" rounded color="green.300">
              <Link to={`/admin/season/${item.imdbID}`}>Get Seasons</Link>
            </CustomButton>
          )}
        </HStack>
      ),
    },
  ];

  /*=========================================== */

  const handlePreviewStream = (item) => {
    onOpen();
    setImdbId(item.imdbID);
  };

  const handleAddMovie = async (movie) => {
    if (movie) {
      await addMovie(movie);
      await fetchedAllMovies();
      alert("added");
    }
  };

  /*=========================================== */

  function keyFn(item) {
    return item.imdbID;
  }

  const handleKeyChange = async (e) => {
    if (e.key === "Enter") {
      await findMovieOrSeries(title, type);
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    await findMovieOrSeries(title, type);
  };

  // helpere function
  const findMovieOrSeries = async (currentTitle, currentType) => {
    if (!title.trim()) {
      alert(`Enter valid ${type} title!`);
      return;
    }
    const response = await findMovie(currentTitle, currentType);
    if (response) {
      alert(response);
    }
    setTitle("");
  };

  if (isLoading) {
    return <Loader />;
  }

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
              placeholder={`Search for ${type}`}
              sx={{
                marginRight: "0",
              }}
            />

            <HStack mt={{ md: "12px", sm: "12px", lg: "0" }}>
              <CustomSelect
                options={options}
                value={type}
                onChange={(e) => setType(e.target.value)}
              />

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
          <ListTable keyFn={keyFn} data={filteredListData} config={config} />
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
