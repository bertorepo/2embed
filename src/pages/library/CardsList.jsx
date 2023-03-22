import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Card from "../../components/Card";
import { useMovieContext } from "../../hooks/use-movie-context";
import EmptyPage from "../../components/EmptyPage";

function CardsList() {
  const { movies } = useMovieContext();

  const renderedMovies =
    movies &&
    movies.map((movie) => {
      return <Card key={movie.id} movie={movie} />;
    });
  return (
    <Box mx={4} mt={10}>
      <Flex
        alignItems="stretch"
        justify="center"
        flexWrap="wrap"
        sx={{
          gap: "18px",
        }}
      >
        {movies.length === 0 ? <EmptyPage /> : renderedMovies}
      </Flex>
    </Box>
  );
}

export default CardsList;
