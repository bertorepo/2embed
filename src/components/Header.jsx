import { Box, Text, Flex } from "@chakra-ui/react";

function Header({ children, pageHeading, pageSubHeading, ...rest }) {
  return (
    <>
      <Box mt={10}>
        <Text fontSize="3xl">{pageHeading}</Text>
        <Text color="gray.500" fontSize="md">
          {pageSubHeading}
        </Text>
      </Box>

      <Flex
        {...rest}
        sx={{
          marginTop: "18px",
        }}
      >
        {children}
      </Flex>
    </>
  );
}

export default Header;
