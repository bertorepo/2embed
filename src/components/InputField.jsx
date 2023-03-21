import { Input } from "@chakra-ui/react";

function InputField({ ...rest }) {
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
      {...rest}
    />
  );
}

export default InputField;
