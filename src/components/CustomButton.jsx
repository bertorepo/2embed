import { Box, Button } from "@chakra-ui/react";

function CustomButton({children,rounded, ...rest}) {
  return (
      <Box
          as={Button}
          fontWeight={"thin"}
          rounded={rounded ? "full" : "none"}
   
          {...rest}
        >
          {children}
        </Box>
  )
}

export default CustomButton;