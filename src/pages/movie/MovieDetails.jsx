import { Box, Text, Image } from "@chakra-ui/react";

function MovieDetails({ info, children, ...rest }) {
  const { Plot, Genre, Runtime, Title, Poster } = info;
  const plotStr = Plot && Plot.split(".")[0];
  return (
    <Box
      {...rest}
      display={"flex"}
      flexWrap="wrap"
      gap={4}
      alignItems={"start"}
    >
      <Image
        w={"150px"}
        objectFit="cover"
        objectPosition="center"
        h={"200px"}
        sx={{
          borderRadius: "8px",
        }}
        src={Poster}
      />
      <Box
        display={"flex"}
        flexDirection={"column"}
        h={"full"}
        gap={3}
        justify="start"
        width={"lg"}
      >
        <Text fontSize={"xl"}>{Title}</Text>
        <Text color={"gray.400"} fontSize={"sm"}>
          {plotStr}.
        </Text>
        <Text color={"gray.400"} fontSize={"sm"}>
          Duration: {Runtime}
        </Text>
        <Text color={"gray.400"} fontSize={"sm"}>
          Genres: {Genre}
        </Text>
        {children}
      </Box>
    </Box>
  );
}

export default MovieDetails;
