import { Box, Button } from "@chakra-ui/react";

function CustomButton({ children, rounded, ...rest }) {
  return (
    <Box
      as={Button}
      fontWeight={"thin"}
      rounded={rounded ? "full" : "none"}
      _active={{
        bg: "cyan.500",
        color: "black",
      }}
      {...rest}
    >
      {children}
    </Box>
  );
}

export default CustomButton;
