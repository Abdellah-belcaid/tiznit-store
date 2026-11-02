import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { LangProvider } from "./lib/i18n";
import { CartProvider } from "./lib/cart";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <LangProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </LangProvider>
    </BrowserRouter>
  </StrictMode>
);
