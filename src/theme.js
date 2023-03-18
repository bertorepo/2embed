import { extendTheme } from '@chakra-ui/react'

const config = {
  fonts: {
    body: "Poppins, sans-serif",
    heading: "Poppins, sans-serif",
  },
  initialColorMode: "dark",
  useSystemColorMode: false,
}

const theme = extendTheme({...config});

export default theme;