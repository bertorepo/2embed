import { Box,  ButtonGroup, Flex, Input, Text,} from "@chakra-ui/react";
import CustomButton from "../../components/CustomButton";
import BoxContainer from "../../layout/BoxContainer"

function Library() {
  return (
    <BoxContainer>
      <Box mx={4} mt={10}>
        <Text fontSize="3xl">Library</Text>
        <Text
          color="gray.500"
          fontSize="md">Latest Movies and Shows</Text>
      </Box>

    
      <Flex flexDirection={{sm: "column", md:"row"}} justifyContent='space-between' alignItems="center" sx={{
        marginTop:"18px"
      }}>
        <Box as={ButtonGroup} p={4} isAttached>
          
          <CustomButton rounded _hover={{color:"cyan.500"}} colorScheme="blackAlpha" color="gray.500">Movies</CustomButton>
          <CustomButton rounded _hover={{color:"cyan.500"}} colorScheme="blackAlpha" color="gray.500">TV Shows</CustomButton>
        
        </Box>
        
        <Input variant="filled" placeholder="Search" width="sm" size="md" sx={{
          rounded: "full",
        }} />
      </Flex>

     
   
    </BoxContainer>
  )
} 

export default Library;
