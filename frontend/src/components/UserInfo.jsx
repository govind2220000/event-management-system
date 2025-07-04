import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

function UserInfo() {
  const { user, logout } = useContext(AuthContext);

  if (!user) return null;

  return (
    <div className="bg-white border rounded shadow p-3 text-right mr-2">
      <div className="font-semibold">{user.name}</div>
      <div className="text-sm text-gray-600">{user.role}</div>
      <button
        className="mt-2 text-xs text-red-600 hover:underline bg-transparent border-none cursor-pointer"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}

export default UserInfo; 