import {
  Box,
  Divider,
  FormControl,
  FormLabel,
  Text,
  VStack,
  Center,
} from "@chakra-ui/react";
import { useId } from "react";
import { useState } from "react";

import CustomButton from "../../components/CustomButton";
import InputField from "../../components/InputField";
import { useAdminContext } from "../../hooks/use-admin-context";
import BoxContainer from "../../layout/BoxContainer";

function Login() {
  const { authenticateUser } = useAdminContext();
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });

  const userId = useId();
  const passId = useId();

  const handleLogin = async (e) => {
    e.preventDefault();
    await authenticateUser(loginDetails);

    setLoginDetails({
      username: "",
      password: "",
    });
  };

  return (
    <BoxContainer display="flex" alignItems="center" h={"70vh"} mt={10}>
      <Box
        boxShadow="xl"
        w={"sm"}
        p={6}
        bg="blackAlpha.500"
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
              <InputField
                w={"auto"}
                id={userId}
                value={loginDetails.username}
                onChange={(e) =>
                  setLoginDetails({ ...loginDetails, username: e.target.value })
                }
                type="text"
                placeholder="Enter username"
              />
            </Box>

            <Box>
              <FormLabel color="cyan.600">Password</FormLabel>
              <InputField
                w={"auto"}
                id={passId}
                value={loginDetails.password}
                onChange={(e) =>
                  setLoginDetails({ ...loginDetails, password: e.target.value })
                }
                type="password"
                placeholder="Enter password"
              />
            </Box>
            <Center>
              <CustomButton
                onClick={handleLogin}
                w="200px"
                rounded
                bg="cyan.600"
              >
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
