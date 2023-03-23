import BoxContainer from "../../layout/BoxContainer";
import { Box, Text } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import Iframe from "../../components/Iframe";
import MovieDetails from "./MovieDetails";

import { Link, useNavigate, useParams } from "react-router-dom";
import useLoader from "../../hooks/use-loader";
import Loader from "../../components/Loader";
import { useMovieContext } from "../../hooks/use-movie-context";
import { useEffect, useMemo, useState } from "react";
import GoBack from "../../components/GoBack";

function MoviePage() {
  const { isLoading } = useLoader();
  const [details, setDetails] = useState({});
  const { imdb } = useParams();
  const navigate = useNavigate();

  const { fetchDetails } = useMovieContext();

  useMemo(() => {
    const runEffect = async () => {
      const results = await fetchDetails(imdb);
      if (results.Error) {
        navigate("/library");
        return;
      }
      setDetails(results);
    };

    if (imdb) {
      runEffect();
    }
  }, [imdb, fetchDetails, navigate]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <BoxContainer mt={12}>
      <GoBack mx="auto" path="/library" location="Library" />
      <Box
        mt={{ md: 4, lg: 8, sm: 4 }}
        display={"flex"}
        flexDirection={"column"}
        justify={"center"}
        alignItems="center"
        maxW={"5xl"}
        mx="auto"
      >
        <Box rounded={"lg"} width={"full"} height={{ sm: "sm", md: "lg" }}>
          <Iframe src={imdb} />
        </Box>
        <Box
          boxShadow={"2xl"}
          rounded={"lg"}
          bg="blackAlpha.400"
          width={"full"}
          p={12}
        >
          <MovieDetails info={details} />
        </Box>
      </Box>
    </BoxContainer>
  );
}

export default MoviePage;
