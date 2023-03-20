import { Input } from "@chakra-ui/react";

function InputField() {
  return (
    <Input
      variant="filled"
      placeholder="Search"
      width="sm"
      size="md"
      sx={{
        rounded: "full",
        marginRight: "14px",
      }}
    />
  );
}

export default InputField;
