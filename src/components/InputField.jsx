import { Input } from "@chakra-ui/react";

function InputField({ placeholder, ...rest }) {
  return (
    <Input
      variant="filled"
      placeholder={placeholder}
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
