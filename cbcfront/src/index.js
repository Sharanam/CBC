import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "70vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0",
            padding: "0",
            backgroundColor: "var(--dark-blue)",
          }}
        >
          <h1>
            <mark>Something went wrong.</mark>
          </h1>
        </div>
      );
    }

    return this.props.children;
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // strict mode is not required because of the full stack development
  // <React.StrictMode>
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
  // </React.StrictMode>
);
axios.defaults.baseURL =
  /*process.env.NODE_ENV === "production" ? "" :*/ "http://localhost:8000/api";
// uncomment for production only.
reportWebVitals();
