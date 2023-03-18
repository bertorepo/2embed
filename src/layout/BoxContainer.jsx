import { Container } from "@chakra-ui/react";

function BoxContainer({ children }) {
  return (
    <Container maxW="8xl" pb={12}>
      {children}
    </Container>
  );
}

export default BoxContainer;
