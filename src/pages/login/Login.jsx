import {
  Box,
  Divider,
  FormControl,
  FormLabel,
  Text,
  VStack,
  Center,
} from "@chakra-ui/react";
import CustomButton from "../../components/CustomButton";
import InputField from "../../components/InputField";
import BoxContainer from "../../layout/BoxContainer";

function Login() {
  return (
    <BoxContainer display="flex" alignItems="center" h={"70vh"} mt={10}>
      <Box
        boxShadow="xl"
        p={12}
        bg="blackAlpha.500"
        width={{ sm: "md", md: "md", xl: "lg" }}
        rounded="lg"
        mx={"auto"}
        h={"sm"}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Text align="center" fontSize={"lg"}>
          Login to Manage
        </Text>
        <Divider my={5} orientation="horizontal" />
        <FormControl>
          <VStack spacing={5}>
            <Box>
              <FormLabel color="cyan.600">Username</FormLabel>
              <InputField type="text" placeholder="Enter username" />
            </Box>

            <Box>
              <FormLabel color="cyan.600">Password</FormLabel>
              <InputField type="password" placeholder="Enter password" />
            </Box>
            <Center>
              <CustomButton w="200px" rounded bg="cyan.600">
                Login
              </CustomButton>
            </Center>
          </VStack>
        </FormControl>
      </Box>
    </BoxContainer>
  );
}

export default Login;
