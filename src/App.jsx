import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Catalogue from "./pages/Catalogue";
import Cart from "./pages/Cart";

function AppRoutes() {
  return _jsxs(Routes, {
    children: [
      _jsx(Route, {
        path: "/",
        element: _jsx(Navigate, { to: "/pokemon", replace: true }),
      }),
      _jsx(Route, { path: "/pokemon", element: _jsx(Catalogue, {}) }),
      _jsx(Route, { path: "/cart", element: _jsx(Cart, {}) }),
      _jsx(Route, {
        path: "*",
        element: _jsx(Navigate, { to: "/pokemon", replace: true }),
      }),
    ],
  });
}
export default function App() {
  return _jsx(AppProvider, {
    children: _jsx(HashRouter, { children: _jsx(AppRoutes, {}) }),
  });
}
