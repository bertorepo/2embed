import "@fontsource/poppins"
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme from "./theme"

import MainProvider from "./context";



const el = document.getElementById("root");

const root = ReactDOM.createRoot(el);

root.render(
  <>
   <ColorModeScript initialColorMode="dark" />
    <ChakraProvider theme={theme}>
      <MainProvider>
        <App />
      </MainProvider>
    </ChakraProvider>
  </>
)