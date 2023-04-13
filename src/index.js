import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.min.css";
import App from "./App";
import { StoreProvider } from "easy-peasy";
import store from "./easy-peasy/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </React.StrictMode>
);
