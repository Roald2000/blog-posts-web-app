import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import './app/css/app.css'

const root = document.querySelector("#root");

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);
