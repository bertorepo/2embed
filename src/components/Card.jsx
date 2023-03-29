import { Link } from "react-router-dom";

import { Box, Text, Image } from "@chakra-ui/react";
import { capitalizeFirstLetter } from "../utils/";

function Card({ movie }) {
  const linkParams =
    movie.Type === "movie"
      ? `/movie/${movie.imdbID}`
      : `/series/${movie.imdbID}`;
  return (
    <>
      <Link to={linkParams}>
        <Box
          display={"flex"}
          bg="gray.900"
          rounded={"lg"}
          h={"full"}
          width={"180px"}
          alignItems="center"
          p={4}
          boxShadow={"2xl"}
          flexDirection={"column"}
          cursor={"pointer"}
          _hover={{
            bg: "blackAlpha.600",
            transition: "all .8s",
          }}
        >
          <Image
            objectFit="cover"
            objectPosition="center"
            src={`${movie.Poster}`}
            rounded={"md"}
            width={"160px"}
            sx={{
              marginBottom: "4px",
            }}
          />

          <Box
            display={"flex"}
            flexDirection="column"
            w={"full"}
            sx={{
              marginTop: "auto",
              padding: "4px 8px",
            }}
          >
            <Text fontSize="13px" color="gray.400">
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
