import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css"; // โหลดไฟล์ CSS หลักเพียงบรรทัดเดียว

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);