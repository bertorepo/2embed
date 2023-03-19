import "@fontsource/poppins";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";

import MainProvider from "./context";

import { RouterProvider } from "react-router-dom";
import { mainRoot } from "./route";

const el = document.getElementById("root");

const root = ReactDOM.createRoot(el);

root.render(
  <>
    <ColorModeScript initialColorMode="dark" />
    <ChakraProvider theme={theme}>
      <MainProvider>
        <RouterProvider router={mainRoot}>
          <App />
        </RouterProvider>
      </MainProvider>
    </ChakraProvider>
  </>
);
