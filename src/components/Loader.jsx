import { Box, Spinner } from "@chakra-ui/react";
import BoxContainer from "../layout/BoxContainer";

function Loader() {
  return (
    <BoxContainer>
      <Box
        h={"3xl"}
        display={"flex"}
        justify="center"
        alignItems="center"
        sx={{
          margin: "0 auto",
        }}
      >
        <Spinner
          sx={{
            margin: "0 auto",
          }}
          size="xl"
        />
      </Box>
    </BoxContainer>
  );
}

export default Loader;
