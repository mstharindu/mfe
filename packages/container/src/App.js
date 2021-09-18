import React from "react";
import { mount } from "marketing/MarketingApp";
import MarketingApp from "./components/MarketingApp";
import Header from "./components/Header";
import { BrowserRouter } from "react-router-dom";
import { StylesProvider, createGenerateClassName } from "@material-ui/styles";

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});
export default () => {
  return (
    <StylesProvider generateClassName={generateClassName}>
      <BrowserRouter>
        <Header />
        <MarketingApp />
      </BrowserRouter>
    </StylesProvider>
  );
};
