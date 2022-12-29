import React from "react";
import ReactDOM from "react-dom";
import { useChromeStorageLocal } from "use-chrome-storage";
import { ChakraProvider } from "@chakra-ui/react";
import { PopupContent } from "./PopupContent";
import theme from "./theme";

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <PopupContent />
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById("root")
);
