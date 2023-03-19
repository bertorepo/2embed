import { Link } from "react-router-dom";

import { Box, Text, Image } from "@chakra-ui/react";
import { capitalizeFirstLetter } from "../utils/";

function Card({ movie }) {
  const linkParams =
    movie.Type === "movie" ? `movie/${movie.imdbID}` : `series/${movie.imdbID}`;
  return (
    <>
      <Link to={linkParams}>
        <Box
          maxW={"230px"}
          bg="gray.900"
          w={"full"}
          rounded={"lg"}
          p={4}
          boxShadow={"2xl"}
          display={"flex"}
          flexDirection={"column"}
          cursor={"pointer"}
        >
          <Image
            objectFit="cover"
            objectPosition="center"
            src={`${movie.Poster}`}
            rounded={"md"}
            sx={{
              marginBottom: "4px",
            }}
          />

          <Box
            display={"flex"}
            flexDirection="column"
            sx={{
              marginTop: "auto",
              padding: "4px 8px",
            }}
          >
            <Text fontSize="md" color="gray.300">
              {movie.Title}
            </Text>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text
                fontSize="sm"
                sx={{ paddingTop: "4px", marginBottom: "auto" }}
                color="gray.600"
              >
                {movie.Year}
              </Text>
              <Text
                fontSize="sm"
                sx={{
                  paddingTop: "4px",
                  marginBottom: "auto",
                }}
                color="gray.600"
              >
                {capitalizeFirstLetter(movie.Type)}
              </Text>
            </Box>
          </Box>
        </Box>
      </Link>
    </>
  );
}

export default Card;
