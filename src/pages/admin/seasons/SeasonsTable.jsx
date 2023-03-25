import { useState } from "react";

import {
  Box,
  Flex,
  Icon,
  HStack,
  useDisclosure,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { StarIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import CustomButton from "../../../components/CustomButton";
import ListTable from "../components/ListTable";
import { usePaginate } from "../../../hooks/use-paginate";
import Pagination from "../../../components/Pagination";
import { useMovieContext } from "../../../hooks/use-movie-context";
import { useEffect } from "react";
import CustomModal from "../../../components/CustomModal";
import Iframe from "../../../components/Iframe";

function SeasonsTable({ episodes, currentSeason, imdb }) {
  const { fetchAllSeasons, appendEpisode } = useMovieContext();
  const {
    currentItems,
    pageCount,
    handlePageClick,
    selectedPage,
    setSelectedPage,
    setCurrentPageNumber,
  } = usePaginate(episodes);
  const [currentEpisode, setCurrentEpisode] = useState(1);
  const { isOpen, onClose, onOpen } = useDisclosure();

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
      render: (episode) => {
        const isAddedAlready = episode.isAdded;

        return (
          <HStack spacing={4}>
            <CustomButton
              onClick={() => handlePreviewEpisodeClick(episode.Episode)}
              size={"sm"}
              rounded
              color="green.300"
            >
              Preview
            </CustomButton>
            <CustomButton
              onClick={() => handleAddEpisodeClick(episode)}
              size={"sm"}
              rounded
              bg={isAddedAlready ? "blackAlpha.600" : "cyan.600"}
              isDisabled={isAddedAlready}
            >
              {isAddedAlready ? "Added!" : "Add Episode"}
            </CustomButton>
          </HStack>
        );
      },
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

  const handlePreviewEpisodeClick = (currentEpisode) => {
    if (currentEpisode) {
      onOpen();
      setCurrentEpisode(Number(currentEpisode));
    }
  };
  /* ====================================== */

  return (
    <Box mt={5}>
      <ListTable data={currentItems} keyFn={keyFn} config={episodeConfig} />
      {/* pagination */}
      <Pagination
        pageCount={pageCount}
        handlePageClick={handlePageClick}
        selectedPage={selectedPage}
      />

      <CustomModal
        size={{ md: "md", lg: "6xl", sm: "sm" }}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalBody pb={6}>
          <Box height={{ lg: "4xl" }}>
            <Iframe
              src={imdb}
              episode={currentEpisode}
              season={currentSeason}
            />
          </Box>
        </ModalBody>
        <ModalFooter>
          <CustomButton onClick={onClose} rounded bg="cyan.600">
            Close
          </CustomButton>
        </ModalFooter>
      </CustomModal>
    </Box>
  );
}

export default SeasonsTable;
