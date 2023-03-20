import CustomButton from "../../components/CustomButton";
import InputField from "../../components/InputField";
import Loader from "../../components/Loader";
import useLoader from "../../hooks/use-loader";
import { useMovieContext } from "../../hooks/use-movie-context";
import BoxContainer from "../../layout/BoxContainer";
import CardsList from "./CardsList";
import Header from "../../components/Header";
import ButtonGroup from "../../components/ButtonGroup";
import { useFilterList } from "../../hooks/use-filter-list";

function Library() {
  const { movies } = useMovieContext();
  const { handleFilterData, currentType } = useFilterList();
  const { isLoading } = useLoader(movies);

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
      {isLoading ? <Loader /> : <CardsList movies={movies} />}
    </BoxContainer>
  );
}

export default Library;
