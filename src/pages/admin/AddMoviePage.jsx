import { useState } from "react";
import {
  Box,
  FormControl,
  Flex,
  HStack,
  Select,
  Center,
  Text,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import InputField from "../../components/InputField";
import BoxContainer from "../../layout/BoxContainer";
import ListTable from "./components/ListTable";
import CustomButton from "../../components/CustomButton";
import { useAdminContext } from "../../hooks/use-admin-context";
import { capitalizeFirstLetter } from "../../utils/index";

const options = [
  { label: "Movie", value: "movie" },
  { label: "Series", value: "series" },
];

function AddMoviePage() {
  const { findMovie, listData } = useAdminContext();
  const [title, setTitle] = useState("");
  const [type, setType] = useState(options[0].value);

  const config = [
    {
      label: "Title",
      render: (item) => (
        <>
          <Flex alignItems="center" columnGap={3}>
            <StarIcon color="cyan.600" /> {item.Title} ({item.Year})
          </Flex>
        </>
      ),
    },
    {
      label: "Actions",
      render: (item) => (
        <HStack spacing={4}>
          {item.Type === "movie" ? (
            <CustomButton rounded color="green.300">
              Preview Stream
            </CustomButton>
          ) : (
            <CustomButton rounded color="green.300">
              Get Seasons
            </CustomButton>
          )}

          <CustomButton bg="cyan.600" rounded>
            Details
          </CustomButton>
        </HStack>
      ),
    },
  ];

  function keyFn(item) {
    return item.imdbID;
  }

  const handleKeyChange = async (e) => {
    setTitle(e.target.value);
    if (e.key === "Enter") {
      if (!title.trim()) {
        alert(`Enter valid ${type} title!`);
        return;
      }

      const response = await findMovie(title, type);
      if (response) {
        alert(response);
      }
      setTitle("");
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert(`Enter valid ${type} title!`);
      return;
    }
    const response = await findMovie(title, type);
    if (response) {
      alert(response);
    }
    setTitle("");
  };

  const renderEmpty = () => {
    return (
      <Center mt={10}>
        <Text color="gray.700" fontSize={"3xl"}>
          Populate Data in the Search Box!
        </Text>
      </Center>
    );
  };

  return (
    <BoxContainer>
      <Header
        pageHeading="Add Movie / Series"
        pageSubHeading="Browse movie/serfies to be added"
      ></Header>

      <Box
        w={"full"}
        display="flex"
        justifyContent="end"
        flexDirection="column"
        alignContent="center"
      >
        <FormControl
          p={4}
          sx={{
            display: "flex",
            justifyContent: "end",
          }}
        >
          <Box
            display="flex"
            justifyContent={{ sm: "center", lg: "end", md: "center" }}
            flexDirection={{ md: "column", lg: "row", sm: "column" }}
            alignItems={{ sm: "center", md: "center" }}
            columnGap={2}
          >
            <InputField
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => handleKeyChange(e)}
              sx={{
                marginRight: "0",
              }}
            />

            <HStack mt={{ md: "12px", sm: "12px", lg: "0" }}>
              <Select
                color="white"
                w={"150px"}
                borderColor="cyan.400"
                variant="outline"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                {options.map((listOption) => {
                  return (
                    <option key={listOption.value} value={listOption.value}>
                      {listOption.label}
                    </option>
                  );
                })}
              </Select>

              <CustomButton
                onClick={handleSearchSubmit}
                bg="cyan.600"
                color="blackAlpha.900"
                rounded
              >
                Search {capitalizeFirstLetter(type)}
              </CustomButton>
            </HStack>
          </Box>
        </FormControl>

        {/* table */}

        {listData.length === 0 ? (
          renderEmpty()
        ) : (
          <ListTable keyFn={keyFn} data={listData} config={config} />
        )}
      </Box>
    </BoxContainer>
  );
}

export default AddMoviePage;
