import BoxContainer from "../../layout/BoxContainer";
import Header from "../../components/Header";
import ButtonGroup from "../../components/ButtonGroup";
import CustomButton from "../../components/CustomButton";
import InputField from "../../components/InputField";
import ListTable from "./components/ListTable";
import { Box } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

function AdminPage() {
  return (
    <BoxContainer>
      <Header pageHeading="Admin Area" pageSubHeading="Manage Movies and Shows">
        <ButtonGroup>
          <CustomButton rounded color="gray.500">
            Movies
          </CustomButton>
          <CustomButton rounded color="gray.500">
            Series
          </CustomButton>
        </ButtonGroup>

        {/* use for search */}
        <InputField />
      </Header>

      {/* table */}
      <Box display="flex" mx={4} mt={4} color="cyan.500" justifyContent={"end"}>
        <CustomButton
          _hover={{
            bg: "cyan.500",
            color: "black",
          }}
          leftIcon={<AddIcon h={3} w={3} />}
          rounded
        >
          Add Movie
        </CustomButton>
      </Box>
      <ListTable />
    </BoxContainer>
  );
}

export default AdminPage;
