import { Box, Center, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import BoxContainer from "../layout/BoxContainer";
import CustomButton from "./CustomButton";

function ErrorPage() {
  return (
    <BoxContainer>
      <Box
        flexDirection={"column"}
        display={"flex"}
        justifyContent="center"
        alignItems="center"
        height={"xl"}
      >
        <Text color={"gray.700"} fontSize={"5xl"}>
          Opps! It looks like page Not Found!
        </Text>
        <CustomButton mt={4} rounded bg="cyan.600">
          <Link to="/">Return to HomePage</Link>
        </CustomButton>
      </Box>
    </BoxContainer>
  );
}

export default ErrorPage;
