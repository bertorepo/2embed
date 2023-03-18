import { Box, Text, Flex, Image } from "@chakra-ui/react";

function Card({ movie }) {
  return (
    <Box
      maxW={"230px"}
      bg="gray.900"
      w={"full"}
      rounded={"lg"}
      p={4}
      boxShadow={"2xl"}
      display={"flex"}
      flexDirection={"column"}
    >
      <Image
        objectFit="cover"
        objectPosition="center"
        src={`${movie.Poster}`}
        rounded={"md"}
      />

      <Flex
        flexDirection="column"
        sx={{
          marginTop: "12px",
          padding: "4px 8px",
        }}
      >
        <Text fontSize="md" color="gray.300">
          {movie.Title}
        </Text>
        <Text fontSize="sm" sx={{ paddingTop: "4px" }} color="gray.600">
          {movie.Year}
        </Text>
      </Flex>
    </Box>
  );
}

export default Card;
