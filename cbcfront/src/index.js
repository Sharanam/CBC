import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
axios.defaults.baseURL =
  /*process.env.NODE_ENV === "production" ? "" :*/ "http://localhost:8000/api";
reportWebVitals();
