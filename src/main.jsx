import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./i18n";
import App from "./App.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./app.css";
import "./assets/css/responsive.css";
import "./assets/css/HomeRefine.css";
import "./index.css";
import "./assets/fonts/fonts.css";
import { UserProvider } from "./Context/UserContext.jsx";
import { CartProvider } from "./Context/CartContext.jsx";
import { WishlistProvider } from "./Context/WishListContext.jsx";
import { BrowserRouter as Router } from "react-router-dom";

import { LoaderProvider } from "./context/LoaderContext";
import { ToastContainer } from "react-toastify";
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Router>
    <LoaderProvider>
      <UserProvider>
        <CartProvider>
          <WishlistProvider>
            <App />
          </WishlistProvider>
        </CartProvider>
      </UserProvider>
    </LoaderProvider>
    <ToastContainer />
  </Router>
  // </StrictMode>,
);
