import { Box, ButtonGroup as Group } from "@chakra-ui/react";

function ButtonGroup({ children }) {
  return (
    <Box as={Group} p={4} isAttached>
      {children}
    </Box>
  );
}

export default ButtonGroup;
