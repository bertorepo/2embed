import { useEffect, useRef, useState } from "react";
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
  const {
    fetchSeries,
    addMovie,
    checkMovieById,
    isDisabled,
    fetchAllEpisodes,
    currentEpisodes,
    addAllEpisodes,
    fetchAllSeasons,
    seasonsList,
  } = useMovieContext();

  const [series, setSeries] = useState({});
  const [seasons, setSeasons] = useState([]);
  const [currentSeason, setCurrentSeason] = useState(1);
  const { imdb } = useParams();
  const { isLoading } = useLoader();

  const addedEpisodesRef = useRef(0);

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

  useEffect(() => {
    const runEffect = async () => {
      await fetchAllEpisodes(imdb, currentSeason);
    };

    runEffect();
    addedEpisodesRef.current = 0;
  }, [currentSeason, fetchAllEpisodes, imdb]);

  useEffect(() => {
    const runEffect = async () => {
      await fetchAllSeasons();
    };

    runEffect();
  }, [fetchAllSeasons]);

  const handleAddSeriesClick = async () => {
    await addMovie(series);
    alert("added");
  };

  // filtered added already

  const filteredAddedEpisode =
    currentEpisodes &&
    currentEpisodes.map((episode) => {
      const existingSeason =
        seasonsList &&
        seasonsList.find(
          (sn) => sn.imdbID === imdb && sn.season === String(currentSeason)
        );

      if (existingSeason) {
        addedEpisodesRef.current = existingSeason.episodes.length;
      }

      const existingEpisode =
        existingSeason &&
        existingSeason.episodes.filter((eps) => eps.imdbID === episode.imdbID);

      if (existingEpisode && existingEpisode.length !== 0) {
        return { ...episode, isAdded: true };
      }

      return episode;
    });

  // add all episodes per season
  const handleAddAllEpisodesBySeason = async () => {
    await addAllEpisodes(currentEpisodes, String(currentSeason), imdb);
    await fetchAllSeasons();
    alert(`Added all episodes for Season ${currentSeason}!`);
  };

  const renderSeasonsOption = seasons.map((item, index) => {
    return (
      <option key={index} value={item}>
        Season {item}
      </option>
    );
  });

  const disabledAddAllButton =
    filteredAddedEpisode.length === addedEpisodesRef.current;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <BoxContainer p={4}>
      <Header
        pageHeading="Series / Seasons"
        pageSubHeading="Get Episodes and Seasons"
      />
      <GoBack mt={10} path="/admin/add" location="Admin" />
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

      <Box mt={10} display="flex" alignItems="center" columnGap={"12px"}>
        <Select
          rounded={"full"}
          color="white"
          w={"150px"}
          borderColor="cyan.400"
          variant="outline"
          value={currentSeason}
          onChange={(e) => setCurrentSeason(e.target.value)}
        >
          {renderSeasonsOption}
        </Select>
        <CustomButton
          onClick={handleAddAllEpisodesBySeason}
          rounded
          isDisabled={disabledAddAllButton}
          bg={disabledAddAllButton ? "blackAlpha.500" : "cyan.600"}
        >
          {disabledAddAllButton
            ? "All Added"
            : `Add All Season ${currentSeason}`}
        </CustomButton>
      </Box>

      <SeasonsTable
        currentSeason={currentSeason}
        imdb={imdb}
        episodes={filteredAddedEpisode}
      />
    </BoxContainer>
  );
}

export default SeasonsPage;
