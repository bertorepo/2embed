import { Container } from "@chakra-ui/react"

function BoxContainer({children}) {
  return (
      <Container maxW="8xl">
        {children}
      </Container>
  )
}

export default BoxContainer