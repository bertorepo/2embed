import { Center, Text } from "@chakra-ui/react";

function EmptyPage({ message = "No Data Available!" }) {
  return (
    <Center mt={10}>
      <Text color="gray.700" fontSize={"3xl"}>
        {message}
      </Text>
    </Center>
  );
}
export default EmptyPage;
