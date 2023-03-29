import { Box, ButtonGroup as Group } from "@chakra-ui/react";

function ButtonGroup({ children, ...rest }) {
  return (
    <Box {...rest} as={Group} isAttached>
      {children}
    </Box>
  );
}

export default ButtonGroup;
