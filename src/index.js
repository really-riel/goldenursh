import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.min.css";
import App from "./App";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { StoreProvider } from "easy-peasy";
import store from "./easy-peasy/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </StoreProvider>
  </React.StrictMode>
);
