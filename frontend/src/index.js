import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

// Ensure the root element exists and ReactDOM renders App correctly
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);