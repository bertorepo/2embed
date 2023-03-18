import { Box, ButtonGroup, Flex, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CustomButton from "../../components/CustomButton";
import { useMovieContext } from "../../hooks/use-movie-context";
import BoxContainer from "../../layout/BoxContainer";
import CardsList from "./CardsList";

function Library() {
  const { movies, filterData } = useMovieContext();
  const [currentType, setCurrentType] = useState("movie");

  useEffect(() => {
    // filterData(currentType);
  }, [currentType, filterData]);

  const handleFilterData = (type) => {
    // this will prevent from fetchinf from server again if current type is
    // the same as type argument
    if (currentType && currentType === type) {
      return;
    }

    if (type) {
      filterData(type);
      setCurrentType(type);
    }
  };

  return (
    <BoxContainer>
      <Box mx={4} mt={10}>
        <Text fontSize="3xl">Library</Text>
        <Text color="gray.500" fontSize="md">
          Latest Movies and Shows
        </Text>
      </Box>

      <Flex
        flexDirection={{ sm: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
        sx={{
          marginTop: "18px",
        }}
      >
        <Box as={ButtonGroup} p={4} isAttached>
          <CustomButton
            isActive={currentType === "movie" ? true : false}
            rounded
            onClick={() => handleFilterData("movie")}
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
        </Box>

        <Input
          variant="filled"
          placeholder="Search"
          width="sm"
          size="md"
          sx={{
            rounded: "full",
            marginRight: "14px",
          }}
        />
      </Flex>

      {/* display list of movies / shows */}
      <CardsList movies={movies} />
    </BoxContainer>
  );
}

export default Library;
