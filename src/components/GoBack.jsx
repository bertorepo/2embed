import { Link } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";

function GoBack({ path, location, ...rest }) {
  return (
    <Box
      display={"flex"}
      justifyItems="start"
      columnGap={2}
      cursor={"pointer"}
      maxW={"5xl"}
      // mx="auto"
      _hover={{
        color: "cyan.500",
      }}
      {...rest}
    >
      <ChevronLeftIcon h={6} w={6} />
      <Link to={path}>
        <Text>Go Back to {location}</Text>
      </Link>
    </Box>
  );
}
export default GoBack;
