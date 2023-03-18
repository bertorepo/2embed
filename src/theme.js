import { extendTheme } from '@chakra-ui/react'

const config = {

  initialColorMode: localStorage.setItem("chakra-ui-color-mode", "dark") || "dark",
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
    fonts: {
    body: "Poppins, sans-serif",
    heading: "Poppins, sans-serif",
  },
});

export default theme;