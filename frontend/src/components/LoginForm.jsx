import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { apiRequest } from "../api/api";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await apiRequest("/auth/login", "POST", { email, password });
      login(res.user, res.token);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {error && <div className="text-red-500 mb-2">{error}</div>}
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
      <button className="bg-blue-500 text-white p-2 rounded" type="submit">
        Login
      </button>
    </form>
  );
}

export default LoginForm; 