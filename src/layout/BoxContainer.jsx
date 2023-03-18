import { Container } from "@chakra-ui/react";

function BoxContainer({ children, ...rest }) {
  return (
    <Container {...rest} maxW="8xl" pb={12}>
      {children}
    </Container>
  );
}

export default BoxContainer;
