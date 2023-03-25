import { useEffect, useState } from "react";
import { Select, HStack, Text } from "@chakra-ui/react";

function SelectSeasonEpisode({
  imdb,
  allSeasons,
  onChangeSeason,
  onChangeEpisodeNumber,
  currentEpisode,
  currentSeason,
  ...rest
}) {
  const [allEpisodes, setAllEpisodes] = useState([]);

  useEffect(() => {
    const selectedSeason =
      allSeasons &&
      allSeasons.find((sn) => sn.season === String(currentSeason));

    if (!selectedSeason) {
      return;
    } else {
      setAllEpisodes(selectedSeason.episodes);
    }
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
      <option key={ep.Episode} value={ep.Episode}>
        (Episode {ep.Episode}:) {ep.Title}
      </option>
    );
  });

  const handleChangeEpisode = (currentEpisodeNumber) => {
    onChangeEpisodeNumber(currentEpisodeNumber);
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
