import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./providers/ThemeContext.tsx";
import { GlobalProvider } from "./providers/GlobalContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </GlobalProvider>
  </StrictMode>
);
