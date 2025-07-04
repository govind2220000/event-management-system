import React, { useEffect, useState, useContext } from "react";
import { apiRequest } from "../api/api";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";
import { format } from "date-fns";
import UserInfo from "../components/UserInfo.jsx";
import AdminDashboardButton from "../components/AdminDashboardButton.jsx";

function Home() {
  const [allEvents, setAllEvents] = useState([]);
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const { user, token, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({ date: "", category: "", location: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const EVENTS_PER_PAGE = 5;

  // Debug logs
  console.log("Home render:", { user, token, loading });

  useEffect(() => {
    console.log("Home useEffect: user, token, loading", { user, token, loading });
    if (loading) return;
    if (!user) {
      navigate("/login");
      return;
    }
    if (!token) return;
    apiRequest("/events", "GET", null, token)
      .then(setAllEvents)
      .catch((err) => alert(err.message));
    setCurrentPage(1); // Reset to first page on user/token change
  }, [user, token, loading, navigate]);

  if (loading) return <div>Loading...</div>;

  // Get unique categories and locations for filter dropdowns
  const categories = [...new Set(allEvents.map(event => event?.category))];
  const locations = [...new Set(allEvents.map(event => event.location?.name))];

  // Filter events locally
  const filteredEvents = allEvents.filter(event => {
    const matchDate = !date || event.date.slice(0, 10) === date;
    const matchCategory = !category || event.category === category;
    const matchLocation = !location || event.location?.name === location;
    return matchDate && matchCategory && matchLocation;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredEvents.length / EVENTS_PER_PAGE);
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * EVENTS_PER_PAGE,
    currentPage * EVENTS_PER_PAGE
  );

  return (
    <>
      <div className="fixed top-4 right-4 flex items-center z-50">
        <UserInfo />
        <AdminDashboardButton />
      </div>
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Events</h1>
        {/* Filters */}
        <div className="flex gap-2 mb-4 flex-wrap">
          <input
            type="date"
            className="border p-2 rounded"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
          <select
            className="border p-2 rounded"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            className="border p-2 rounded"
            value={location}
            onChange={e => setLocation(e.target.value)}
          >
            <option value="">All Locations</option>
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
          <button
            className="border p-2 rounded bg-gray-200"
            onClick={() => { setDate(""); setCategory(""); setLocation(""); }}
          >
            Clear Filters
          </button>
        </div>
        {/* Event List */}
        <ul>
          {paginatedEvents.map((event) => (
            <li key={event.id} className="mb-2 border p-2 rounded">
              <Link to={`/event/${event.id}`} className="font-semibold text-blue-600 hover:underline">
                Event Name: {event.title}
              </Link>
              <div>Event Date: {format(new Date(event.date), "PPP")}</div>
              <div>Event Location: {event.location?.name}</div>
              <div>Event Category: {event.category}</div>
            </li>
          ))}
        </ul>
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-4">
            <button
              className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-100"}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Home; 