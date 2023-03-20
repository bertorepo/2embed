import { Box, Flex, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CustomButton from "../../components/CustomButton";
import InputField from "../../components/InputField";
import Loader from "../../components/Loader";
import useLoader from "../../hooks/use-loader";
import { useMovieContext } from "../../hooks/use-movie-context";
import BoxContainer from "../../layout/BoxContainer";
import CardsList from "./CardsList";
import Header from "../../components/Header";
import ButtonGroup from "../../components/ButtonGroup";

function Library() {
  const { movies, filterData } = useMovieContext();
  const [currentType, setCurrentType] = useState("movie");
  const { isLoading } = useLoader(movies);

  useEffect(() => {
    filterData(currentType);
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
      <Header pageHeading="Library" pageSubHeading="Latest Movies and Tv Shows">
        <ButtonGroup>
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
        </ButtonGroup>

        {/* search */}
        <InputField />
      </Header>
      {/* display list of movies / shows */}
      {isLoading ? <Loader /> : <CardsList movies={movies} />}
    </BoxContainer>
  );
}

export default Library;
