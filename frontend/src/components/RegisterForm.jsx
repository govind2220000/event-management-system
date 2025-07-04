import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { apiRequest } from "../api/api";

function RegisterForm() {
  const { login } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await apiRequest("/auth/register", "POST", { name, email, password, role });
      login(res.user, res.token);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <input
        className="border p-2 rounded"
        type="text"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <input
        className="border p-2 rounded"
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        className="border p-2 rounded"
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <select
        className="border p-2 rounded"
        value={role}
        onChange={e => setRole(e.target.value)}
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button className="bg-green-500 text-white p-2 rounded" type="submit">
        Register
      </button>
    </form>
  );
}

export default RegisterForm; 