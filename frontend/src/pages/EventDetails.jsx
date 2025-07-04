import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiRequest } from "../api/api";
import { AuthContext } from "../context/AuthContext.jsx";
import { format } from "date-fns";
import UserInfo from "../components/UserInfo.jsx";
import AdminDashboardButton from "../components/AdminDashboardButton.jsx";

function EventDetails() {
  const { id } = useParams();
  const { user, token, loading } = useContext(AuthContext);
  const [event, setEvent] = useState(null);
  const [registerMsg, setRegisterMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/login");
      return;
    }
    if (!token) return;

    apiRequest(`/events`, "GET", null, token)
      .then(events => {
        const found = events.find(e => String(e.id) === String(id));
        setEvent(found);
      })
      .catch((err) => alert(err.message));
  }, [id, user, token, loading, navigate]);

  const handleRegister = async () => {
    setRegisterMsg("");
    try {
      await apiRequest(`/events/${id}/register`, "POST", null, token);
      setRegisterMsg("Registered successfully!");
    } catch (err) {
      setRegisterMsg(err.message);
    }
  };

  if (loading || !event) return <div>Loading...</div>;

  return (
    <>
      <div className="fixed top-4 right-4 flex items-center z-50">
        <UserInfo />
        <AdminDashboardButton />
      </div>
      <div className="max-w-lg mx-auto mt-8 p-4 border rounded bg-white shadow">
        <button
          className="mb-4 bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded"
          onClick={() => navigate(-1)}
        >
          &larr; Back
        </button>
        <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
        <div className="mb-2">{format(new Date(event.date), "PPP")}</div>
        <div className="mb-2">{event.location?.name}</div>
        <div className="mb-2">{event.category}</div>
        <div className="mb-4">{event.description}</div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleRegister}
        >
          Register for this event
        </button>
        {registerMsg && (
          <div className="mt-2 text-green-600">{registerMsg}</div>
        )}
      </div>
    </>
  );
}

export default EventDetails; 