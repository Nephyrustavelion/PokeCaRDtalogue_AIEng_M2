import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";

import { AppProvider, useApp } from "./context/AppContext";

import Catalogue from "./pages/Catalogue";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Collection from "./pages/Collection";
import NotFound from "./pages/NotFound";

function ProtectedRoute() {
  const { user } = useApp();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

function HomeRedirect() {
  const { user } = useApp();

  return <Navigate to={user ? "/catalogue" : "/login"} replace />;
}

function LoginRoute() {
  const { user } = useApp();

  if (user) {
    return <Navigate to="/catalogue" replace />;
  }

  return <Login />;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Default route */}
      <Route path="/" element={<HomeRedirect />} />
      {/* Public route */}
      <Route path="/login" element={<LoginRoute />} />
      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/cart" element={<Cart />} />
      </Route>
      {/* 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  );
}
