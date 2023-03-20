import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  HStack,
  Icon,
} from "@chakra-ui/react";

import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

function ListTable() {
  return (
    <Box p={4} mt={2}>
      <TableContainer
        bg={"blackAlpha.300"}
        sx={{
          borderRadius: "8px",
          boxShadow: "2xl",
        }}
      >
        <Table size="lg" colorScheme={"blackAlpha"}>
          <Thead bg={"cyan.300"}>
            <Tr>
              <Th color={"black"}>Title</Th>
              <Th
                color={"black"}
                sx={{
                  width: "150px",
                  textAlign: "center",
                }}
              >
                IMDB
              </Th>
              <Th
                color={"black"}
                sx={{
                  width: "150px",
                  textAlign: "center",
                }}
              >
                Actions
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {[1, 2, 3, 4, 5, 6, 8, 9, 10].map((item) => {
              return (
                <Tr
                  key={item}
                  _hover={{ bg: "blackAlpha.400", transition: "all 1s" }}
                >
                  <Td>The Fallen Angels (2023)</Td>
                  <Td>tt5858</Td>
                  <Td>
                    <HStack spacing={4}>
                      <Icon color={"cyan.600"} as={EditIcon} />
                      <Icon color={"red.600"} as={DeleteIcon} />
                    </HStack>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ListTable;
