import { Select } from "@chakra-ui/react";

function CustomSelect({ options, ...rest }) {
  const renderOptions = options.map((optn) => {
    return (
      <option key={optn.value} value={optn.value}>
        {optn.label}
      </option>
    );
  });

  return (
    <Select
      color="white"
      w={"150px"}
      borderColor="cyan.400"
      variant="outline"
      rounded={"full"}
      {...rest}
    >
      {renderOptions}
    </Select>
  );
}

export default CustomSelect;
