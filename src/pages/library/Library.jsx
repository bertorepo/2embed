import { Box,  ButtonGroup, Flex, Input, Text,useColorModeValue,} from "@chakra-ui/react";
import CustomButton from "../../components/CustomButton";
import BoxContainer from "../../layout/BoxContainer"
import CardsList from "./CardsList";

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
          <CustomButton rounded bg={"gray.900"} color="gray.500" >Movies</CustomButton>
          <CustomButton bg={"gray.900"} rounded  color="gray.500">TV Shows</CustomButton>
        </Box>
        
        <Input variant="filled" placeholder="Search" width="sm" size="md" sx={{
          rounded: "full",
        }} />
      </Flex>

      {/* display list of movies / shows */}
      
      <CardsList />
  
    </BoxContainer>
  )
} 

export default Library;
