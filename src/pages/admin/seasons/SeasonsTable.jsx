import { Box, Flex, Icon, HStack } from "@chakra-ui/react";
import { StarIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import CustomButton from "../../../components/CustomButton";
import ListTable from "../components/ListTable";
import { usePaginate } from "../../../hooks/use-paginate";
import Pagination from "../../../components/Pagination";

function SeasonsTable({ episodes }) {
  const { currentItems, pageCount, handlePageClick, selectedPage } =
    usePaginate(episodes);
  console.log(episodes);
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
          <CustomButton size={"sm"} rounded bg="cyan.600">
            Add Episode
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

  return (
    <Box mt={5}>
      <ListTable data={currentItems} keyFn={keyFn} config={episodeConfig} />
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
