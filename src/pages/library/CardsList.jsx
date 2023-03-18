import { Box, Flex } from "@chakra-ui/react";
import Card from "../../components/Card";

function CardsList({ movies }) {
  const renderedMovies = movies.map((movie) => {
    return <Card key={movie.imdbID} movie={movie} />;
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
        {renderedMovies}
      </Flex>
    </Box>
  );
}

export default CardsList;
