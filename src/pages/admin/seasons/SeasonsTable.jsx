import { Box, Flex, Icon, HStack } from "@chakra-ui/react";
import { StarIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import CustomButton from "../../../components/CustomButton";
import ListTable from "../components/ListTable";
import { usePaginate } from "../../../hooks/use-paginate";
import Pagination from "../../../components/Pagination";
import { useMovieContext } from "../../../hooks/use-movie-context";
import { useEffect } from "react";

function SeasonsTable({ episodes, currentSeason, imdb }) {
  const {
    currentItems,
    pageCount,
    handlePageClick,
    selectedPage,
    setSelectedPage,
    setCurrentPageNumber,
  } = usePaginate(episodes);
  const { fetchAllSeasons, seasonsList, appendEpisode } = useMovieContext();

  useEffect(() => {
    const runEffect = async () => {
      await fetchAllSeasons();
    };
    runEffect();
  }, [fetchAllSeasons]);

  useEffect(() => {
    setSelectedPage(0);
    setCurrentPageNumber(0);
  }, [currentSeason, setSelectedPage, setCurrentPageNumber]);
  const episodeConfig = [
    {
      label: "Title",
      render: (episode) => (
        <>
          <Flex alignItems="center" columnGap={3}>
            <StarIcon color="cyan.600" /> {episode.Episode}. {episode.Title}
          </Flex>
        </>
      ),
    },
    {
      label: "Actions",
      render: (episode) => (
        <HStack spacing={4}>
          <CustomButton size={"sm"} rounded color="green.300">
            Preview
          </CustomButton>
          <CustomButton
            onClick={() => handleAddEpisodeClick(episode)}
            size={"sm"}
            rounded
            bg="cyan.600"
            isDisabled={episode.isAdded}
          >
            {episode.isAdded ? "Added!" : "Add Episode"}
          </CustomButton>
        </HStack>
      ),
    },
    {
      label: "Update/Delete",
      render: (episode) => (
        <HStack spacing={4}>
          <Icon color={"cyan.600"} as={EditIcon} />
          <Icon color={"red.600"} as={DeleteIcon} />
        </HStack>
      ),
    },
  ];

  const keyFn = (episode) => episode.imdbID;

  /* =============  EPISODE=========== */

  const filteredAddedEpisode =
    currentItems &&
    currentItems.map((episode) => {
      const existingSeason =
        seasonsList &&
        seasonsList.find(
          (sn) => sn.imdbID === imdb && sn.season === String(currentSeason)
        );

      const existingEpisode =
        existingSeason &&
        existingSeason.episodes.filter((eps) => eps.imdbID === episode.imdbID);

      if (existingEpisode && existingEpisode.length !== 0) {
        return { ...episode, isAdded: true };
      }

      return episode;
    });

  const handleAddEpisodeClick = async (episode) => {
    const episodeObj = {
      imdbID: imdb,
      season: String(currentSeason),
      episodes: episode,
    };
    await appendEpisode(episodeObj);
    await fetchAllSeasons();
    alert("Added successfully!");
  };
  /* ====================================== */

  return (
    <Box mt={5}>
      <ListTable
        data={filteredAddedEpisode}
        keyFn={keyFn}
        config={episodeConfig}
      />
      {/* pagination */}
      <Pagination
        pageCount={pageCount}
        handlePageClick={handlePageClick}
        selectedPage={selectedPage}
      />
    </Box>
  );
}

export default SeasonsTable;
