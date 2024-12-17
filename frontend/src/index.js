import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import "./styles.css"; // Make sure this file exists and is correctly referenced

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);