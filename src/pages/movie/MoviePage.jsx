import BoxContainer from "../../layout/BoxContainer";
import { Box, Flex, Image, Text, Textarea, VStack } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import Iframe from "../../components/Iframe";
import MovieDetails from "./MovieDetails";

function MoviePage() {
  return (
    <BoxContainer mt={12}>
      <Box
        display={"flex"}
        alignContent="center"
        columGap={3}
        cursor={"pointer"}
        maxW={"5xl"}
        mx="auto"
      >
        <ChevronLeftIcon h={6} w={6} />
        <Text>Go Back to Library</Text>
      </Box>
      <Box
        mt={{ md: 4, lg: 8, sm: 4 }}
        display={"flex"}
        flexDirection={"column"}
        justify={"center"}
        alignItems="center"
        maxW={"5xl"}
        mx="auto"
      >
        <Box rounded={"lg"} width={"full"} height={"lg"}>
          <Iframe />
        </Box>
        <Box
          boxShadow={"2xl"}
          rounded={"lg"}
          bg="blackAlpha.400"
          width={"full"}
          p={12}
        >
          <MovieDetails />
        </Box>
      </Box>
    </BoxContainer>
  );
}

export default MoviePage;
