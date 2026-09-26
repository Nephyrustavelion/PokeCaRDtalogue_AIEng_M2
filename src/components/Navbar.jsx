import { NavLink, useNavigate } from "react-router-dom";

import { ShoppingCart, LogOut, User } from "lucide-react";

import { useApp } from "../context/AppContext";

import "./Navbar.css";

export default function Navbar() {
  const { user, logout, cart } = useApp();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    `px-3 py-1.5 text-sm rounded-lg transition-colors font-medium ${
      isActive
        ? "bg-[#f5c518]/15 text-[#111110]"
        : "text-[#6b6b64] hover:text-[#111110] hover:bg-[#f0eeec]"
    }`;

  return (
    <header className="navbar sticky top-0 z-50 w-full border-b">
      <div className="app-shell px-6 h-14 flex items-center justify-between gap-6">
        {/* Brand */}
        <NavLink to="/catalogue" className="flex items-center gap-2 shrink-0">
          <span className="navbar__brand text-lg font-bold tracking-tight">
            Poké Card Atlas
          </span>
        </NavLink>

        {/* Main navigation */}
        <nav className="hidden sm:flex items-center gap-1">
          <NavLink to="/login" className={navLinkClass}>
            Login
          </NavLink>

          <NavLink to="/catalogue" className={navLinkClass}>
            Catalogue
          </NavLink>

          <NavLink to="/collection" className={navLinkClass}>
            My Collection
          </NavLink>

          <NavLink to="/cart" className={navLinkClass}>
            My Cart
          </NavLink>
        </nav>

        {/* User actions */}
        <div className="flex items-center gap-3">
          <NavLink
            to="/cart"
            className="relative p-2 rounded-lg hover:bg-[#f0eeec] transition-colors"
          >
            <ShoppingCart size={18} color="#3a3a38" />

            {cart.length > 0 && (
              <span className="navbar__cart-count absolute -top-0.5 -right-0.5 flex items-center justify-center text-[10px] font-bold rounded-full">
                {cart.length}
              </span>
            )}
          </NavLink>

          <div className="flex items-center gap-2">
            <div className="navbar__avatar w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold">
              {user ? user[0].toUpperCase() : <User size={14} />}
            </div>

            <span className="navbar__user-name hidden sm:block text-sm font-medium">
              {user}
            </span>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="p-2 rounded-lg hover:bg-[#f0eeec] transition-colors"
            title="Logout"
          >
            <LogOut size={16} color="#8a8a84" />
          </button>
        </div>
      </div>
    </header>
  );
}
