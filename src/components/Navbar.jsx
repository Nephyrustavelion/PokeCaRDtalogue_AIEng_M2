import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart, LogOut, User } from "lucide-react";
import { useApp } from "../context/AppContext";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout, cart } = useApp();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return _jsx("header", {
    className: "navbar sticky top-0 z-50 w-full border-b",
    children: _jsxs("div", {
      className: "app-shell px-6 h-14 flex items-center justify-between gap-6",
      children: [
        _jsx(NavLink, {
          to: "/pokemon",
          className: "flex items-center gap-2 shrink-0",
          children: _jsx("span", {
            className: "navbar__brand text-lg font-bold tracking-tight",
            children: "Card Atlas",
          }),
        }),
        _jsxs("nav", {
          className: "hidden sm:flex items-center gap-1",
          children: [
            _jsx(NavLink, {
              to: "/pokemon",
              className: ({ isActive }) =>
                `px-3 py-1.5 text-sm rounded-lg transition-colors font-medium ${
                  isActive
                    ? "bg-[#f5c518]/15 text-[#111110]"
                    : "text-[#6b6b64] hover:text-[#111110] hover:bg-[#f0eeec]"
                }`,
              children: "Catalogue",
            }),
            _jsx(NavLink, {
              to: "/cart",
              className: ({ isActive }) =>
                `px-3 py-1.5 text-sm rounded-lg transition-colors font-medium ${
                  isActive
                    ? "bg-[#f5c518]/15 text-[#111110]"
                    : "text-[#6b6b64] hover:text-[#111110] hover:bg-[#f0eeec]"
                }`,
              children: "My Cart",
            }),
          ],
        }),
        _jsxs("div", {
          className: "flex items-center gap-3",
          children: [
            _jsxs(NavLink, {
              to: "/cart",
              className:
                "relative p-2 rounded-lg hover:bg-[#f0eeec] transition-colors",
              children: [
                _jsx(ShoppingCart, { size: 18, color: "#3a3a38" }),
                cart.length > 0 &&
                  _jsx("span", {
                    className:
                      "navbar__cart-count absolute -top-0.5 -right-0.5 flex items-center justify-center text-[10px] font-bold rounded-full",
                    children: cart.length,
                  }),
              ],
            }),
            _jsxs("div", {
              className: "flex items-center gap-2",
              children: [
                _jsx("div", {
                  className:
                    "navbar__avatar w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold",
                  children: user
                    ? user[0].toUpperCase()
                    : _jsx(User, { size: 14 }),
                }),
                _jsx("span", {
                  className:
                    "navbar__user-name hidden sm:block text-sm font-medium",
                  children: user,
                }),
              ],
            }),
            _jsx("button", {
              onClick: handleLogout,
              className: "p-2 rounded-lg hover:bg-[#f0eeec] transition-colors",
              title: "Logout",
              children: _jsx(LogOut, { size: 16, color: "#8a8a84" }),
            }),
          ],
        }),
      ],
    }),
  });
}
