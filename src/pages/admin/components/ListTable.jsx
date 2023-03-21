import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

function ListTable({ config, data, keyFn }) {
  const renderedHeaderRow = config.map((column) => {
    return (
      <Th key={column.label} color={"black"}>
        {column.label}
      </Th>
    );
  });

  const renderedColumnData = data.map((item) => {
    const columnList = config.map((row) => {
      return <Td key={row.label}>{row.render(item)}</Td>;
    });

    return (
      <Tr
        key={keyFn(item)}
        _hover={{ bg: "blackAlpha.400", transition: "all 1s" }}
      >
        {columnList}
      </Tr>
    );
  });

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
          <Thead bg={"cyan.600"}>
            <Tr>{renderedHeaderRow}</Tr>
          </Thead>
          <Tbody>{renderedColumnData}</Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ListTable;
