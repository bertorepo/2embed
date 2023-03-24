import { useEffect, useState } from "react";
import { Select, HStack } from "@chakra-ui/react";
import { useMovieContext } from "../../hooks/use-movie-context";

function SelectSeasonEpisode({
  imdb,
  allSeasons,
  onChangeSeason,
  onChangeEpisodeImdb,
  currentEpisode,
  currentSeason,
  ...rest
}) {
  const [allEpisodes, setAllEpisodes] = useState([]);

  useEffect(() => {
    const selectedSeason =
      allSeasons &&
      allSeasons.find((sn) => sn.season === String(currentSeason));

    const { episodes } = selectedSeason;
    setAllEpisodes(episodes);
  }, [currentSeason, allSeasons]);

  const renderSeasonOptions =
    allSeasons &&
    allSeasons.map((sn) => {
      return (
        <option key={sn.id} value={sn.season}>
          Season {sn.season}
        </option>
      );
    });

  const renderedEpisodeOptions = allEpisodes.map((ep) => {
    return (
      <option key={ep.Episode} value={ep.imdbID}>
        {ep.Title}
      </option>
    );
  });

  const handleChangeEpisode = (imdb) => {
    const currentEpisodeByImdb = allEpisodes.find((eps) => eps.imdbID === imdb);
    onChangeEpisodeImdb(currentEpisodeByImdb.Episode, imdb);
  };

  return (
    <>
      <HStack {...rest} mt={{ md: "12px", sm: "12px", lg: "0" }}>
        <Select
          color="white"
          w={"170px"}
          borderColor="cyan.400"
          variant="outline"
          value={currentSeason}
          onChange={(e) => onChangeSeason(Number(e.target.value))}
        >
          {renderSeasonOptions}
        </Select>
        <Select
          color="white"
          w={"full"}
          borderColor="cyan.400"
          variant="outline"
          value={currentEpisode}
          onChange={(e) => handleChangeEpisode(e.target.value)}
        >
          {renderedEpisodeOptions}
        </Select>
      </HStack>
    </>
  );
}

export default SelectSeasonEpisode;
