import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import "./styles/main.css";
import App from "./App.tsx";

// This is the first React file that runs in the browser.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* BrowserRouter lets us move between pages like /login and /editor. */}
    <BrowserRouter>
      {/* AuthProvider gives login details to the whole app. */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
