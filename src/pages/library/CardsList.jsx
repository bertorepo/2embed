import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Card from "../../components/Card";
import EmptyPage from "../../components/EmptyPage";

function CardsList({ movies }) {
  const renderedMovies =
    movies &&
    movies.map((movie) => {
      return <Card key={movie.id} movie={movie} />;
    });
  return (
    <Box mt={10}>
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
