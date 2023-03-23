import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CustomButton from "../../../components/CustomButton";
import Header from "../../../components/Header";
import { useMovieContext } from "../../../hooks/use-movie-context";
import BoxContainer from "../../../layout/BoxContainer";
import MovieDetails from "../../movie/MovieDetails";
import useLoader from "../../../hooks/use-loader";
import Loader from "../../../components/Loader";
import GoBack from "../../../components/GoBack";

function SeasonsPage() {
  const { fetchSeries, addMovie, checkMovieById, isDisabled } =
    useMovieContext();

  const [series, setSeries] = useState({});
  const { imdb } = useParams();

  const { isLoading } = useLoader();

  useEffect(() => {
    const runEffect = async () => {
      const result = await fetchSeries(imdb);
      await checkMovieById(imdb, "series");
      setSeries(result);
    };

    runEffect();
  }, [fetchSeries, imdb, checkMovieById]);

  const handleAddSeriesClick = async () => {
    await addMovie(series);
    alert("added");
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <BoxContainer p={4}>
      <Header
        pageHeading="Series / Seasons"
        pageSubHeading="Get Episodes and Seasons"
      />
      <GoBack path="/admin/add" location="Admin" />
      <MovieDetails w={"4xl"} mt={5} info={series}>
        <CustomButton
          w={"sm"}
          size="sm"
          onClick={handleAddSeriesClick}
          rounded
          bg={isDisabled ? "blackAlpha.500" : "cyan.600"}
          isDisabled={isDisabled}
        >
          {isDisabled ? "Already Added" : " Add to Server"}
        </CustomButton>
      </MovieDetails>
    </BoxContainer>
  );
}

export default SeasonsPage;
