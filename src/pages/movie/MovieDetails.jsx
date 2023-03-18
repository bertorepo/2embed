import { Box, Text, Image } from "@chakra-ui/react";

function MovieDetails() {
  return (
    <Box display={"flex"} columnGap={6} alignItems={"center"}>
      <Image
        w={"150px"}
        objectFit="cover"
        objectPosition="center"
        h={"200px"}
        sx={{
          borderRadius: "8px",
        }}
        src={
          "https://m.media-amazon.com/images/M/MV5BNzlkNzVjMDMtOTdhZC00MGE1LTkxODctMzFmMjkwZmMxZjFhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"
        }
      />
      <Box
        display={"flex"}
        flexDirection={"column"}
        h={"full"}
        rowGap={3}
        justify="start"
      >
        <Text fontSize={"xl"}>The Fast and the Furious</Text>
        <Text color={"gray.400"} fontSize={"sm"}>
          Los Angeles street racer Dominic Toretto falls under the suspicion of
          the LAPD as a string of high-speed electronics truck robberies rocks
          the area. Brian O'Connor, an officer of the LAPD, joins the ranks of
          Toretto's highly skilled racing crew undercover to convict Toretto.
        </Text>
        <Text color={"gray.400"} fontSize={"sm"}>
          Duration: 106 min
        </Text>
        <Text color={"gray.400"} fontSize={"sm"}>
          Genres: Action, Crime, Thriller
        </Text>
      </Box>
    </Box>
  );
}

export default MovieDetails;
