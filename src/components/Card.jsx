import { Box, Text, Flex, Image } from "@chakra-ui/react"


function Card() {
  return  <Box
      mx={4}
      maxW={"200px"}
      bg="gray.900"
      w={"full"}
      rounded={"lg"}
      h={"full"}
      p={4}
      boxShadow={"2xl"}
    >
      <Image
        objectFit="cover"
        objectPosition="center"
        sx={{
          rounded:"lg"
        }}
        src={'https://img.2embed.to/xxrz/200x300/100/38/27/38277020ede634fbd8abb21d0f4f2147/38277020ede634fbd8abb21d0f4f2147.jpg'} />
      
      <Flex
        flexDirection="column"
        sx={{
        marginTop: "12px",
          padding: "4px 8px",
      }}>
        <Text fontSize="md" color="gray.300" >The Prodigal Son</Text>
        <Text fontSize="sm" sx={{ paddingTop:"4px"}} color="gray.600" >2023</Text>
      </Flex>
      

    </Box>
}

export default Card;