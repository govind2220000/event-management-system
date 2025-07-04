import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { useLocation, useNavigate } from "react-router-dom";

function AdminDashboardButton() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  if (!user || user.role !== "admin") return null;

  // If on /admin, show Home button; otherwise, show Admin Dashboard button
  const isAdminPage = location.pathname === "/admin";

  return (
    <button
      className="ml-4 bg-blue-600 text-white px-4 py-2 rounded shadow"
      style={{ verticalAlign: "middle" }}
      onClick={() => navigate(isAdminPage ? "/" : "/admin")}
    >
      {isAdminPage ? "Home" : "Admin Dashboard"}
    </button>
  );
}

export default AdminDashboardButton; 