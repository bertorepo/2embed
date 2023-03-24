import BoxContainer from "../../layout/BoxContainer";
import { Box, HStack, Text } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import Iframe from "../../components/Iframe";
import MovieDetails from "./MovieDetails";

import { Link, useNavigate, useParams } from "react-router-dom";
import useLoader from "../../hooks/use-loader";
import Loader from "../../components/Loader";
import { useMovieContext } from "../../hooks/use-movie-context";
import { useEffect, useMemo, useState } from "react";
import GoBack from "../../components/GoBack";
import SelectSeasonEpisode from "./SelectSeasonEpisode";

function MoviePage() {
  const { isLoading } = useLoader();
  const [details, setDetails] = useState({});
  const [allSeasons, setAllSeasons] = useState([]);
  const { imdb } = useParams();
  const navigate = useNavigate();

  const [currentSeason, setCurrentSeason] = useState(1);
  const [currentEpisodeImdb, setCurrentEpisodeImdb] = useState("");
  const [currentEpisodeNumber, setCurrentEpisodeNumber] = useState(0);

  const { fetchDetails, fetchAllSeasons, seasonsList } = useMovieContext();

  useMemo(() => {
    const runEffect = async () => {
      const results = await fetchDetails(imdb);
      if (results.Error) {
        navigate("/library");
        return;
      }
      setDetails(results);
    };

    if (imdb) {
      runEffect();
    }
  }, [imdb, fetchDetails, navigate]);

  useEffect(() => {
    const runEffect = async () => {
      await fetchAllSeasons();
    };

    runEffect();
  }, [fetchAllSeasons]);

  useEffect(() => {
    const filterSeasonsByImdb = () => {
      const existingSeason =
        seasonsList && seasonsList.filter((sn) => sn.imdbID === imdb);

      const sortedSeasons = existingSeason.sort((a, b) => {
        const valueA = Number(a.season);
        const valueB = Number(b.season);

        return valueA - valueB;
      });

      // get the first episode in current season
      const currentPlaying = sortedSeasons.find(
        (sn) => sn.season === String(currentSeason)
      );

      const firstEpisode = currentPlaying && currentPlaying.episodes[0].imdbID;
      const episodeNumer = currentPlaying && currentPlaying.episodes[0].Episode;

      setAllSeasons(sortedSeasons);
      setCurrentEpisodeImdb(firstEpisode);
      setCurrentEpisodeNumber(Number(episodeNumer));
    };

    filterSeasonsByImdb();
  }, [imdb, seasonsList]);

  console.log(imdb, currentEpisodeNumber, currentEpisodeImdb);

  const handleChangeSeason = (seasonNumber) => {
    setCurrentSeason(seasonNumber);
    setCurrentEpisodeNumber(1);
  };

  const handleChangeEpisode = (episodeNumber, imdbID) => {
    setCurrentEpisodeImdb(imdbID);
    setCurrentEpisodeNumber(Number(episodeNumber));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <BoxContainer mt={12}>
      <GoBack mx="auto" path="/library" location="Library" />
      <Box
        mt={{ md: 4, lg: 8, sm: 4 }}
        display={"flex"}
        flexDirection={"column"}
        justify={"center"}
        alignItems="center"
        maxW={"5xl"}
        mx="auto"
      >
        <Box rounded={"lg"} width={"full"} height={{ sm: "sm", md: "lg" }}>
          {details.Type === "movie" ? (
            <Iframe src={imdb} />
          ) : (
            <Iframe
              src={imdb}
              episode={currentEpisodeNumber}
              season={currentSeason}
            />
          )}
        </Box>
        <Box
          boxShadow={"2xl"}
          rounded={"lg"}
          bg="blackAlpha.400"
          width={"full"}
          px={12}
          py={6}
        >
          {/* =========================== */}

          {details.Type === "series" && (
            <SelectSeasonEpisode
              allSeasons={allSeasons}
              mb={5}
              imdb={imdb}
              onChangeEpisodeImdb={handleChangeEpisode}
              onChangeSeason={handleChangeSeason}
              currentSeason={currentSeason}
              currentEpisode={currentEpisodeImdb}
            />
          )}

          {/* =========================== */}
          <MovieDetails info={details} />
        </Box>
      </Box>
    </BoxContainer>
  );
}

export default MoviePage;
