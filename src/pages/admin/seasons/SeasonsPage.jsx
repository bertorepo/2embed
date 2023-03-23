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
import SeasonsTable from "./SeasonsTable";

import { Box, Select } from "@chakra-ui/react";
function SeasonsPage() {
  const { fetchSeries, addMovie, checkMovieById, isDisabled } =
    useMovieContext();

  const [series, setSeries] = useState({});
  const [seasons, setSeasons] = useState([]);
  const [currentSeason, setCurrentSeason] = useState(1);
  const { imdb } = useParams();
  const { isLoading } = useLoader();

  useEffect(() => {
    const runEffect = async () => {
      const result = await fetchSeries(imdb);
      await checkMovieById(imdb, "series");
      /**============SEASON====================*/
      // create a shallow array base on number of seasons
      let numberOfSeasons = Array.from(
        Array(Number(result.totalSeasons)),
        (_, i) => i + 1
      );
      /**================================*/
      setSeries(result);
      setSeasons(numberOfSeasons);
    };

    runEffect();
  }, [fetchSeries, imdb, checkMovieById]);

  const handleAddSeriesClick = async () => {
    await addMovie(series);
    alert("added");
  };

  const renderSeasonsOption = seasons.map((item, index) => {
    return (
      <option key={index} value={item}>
        Season {item}
      </option>
    );
  });

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

      <Box mt={10}>
        <Select
          color="white"
          w={"150px"}
          borderColor="cyan.400"
          variant="outline"
          value={currentSeason}
          onChange={(e) => setCurrentSeason(e.target.value)}
        >
          {renderSeasonsOption}
        </Select>
      </Box>

      <SeasonsTable series={series} />
    </BoxContainer>
  );
}

export default SeasonsPage;
