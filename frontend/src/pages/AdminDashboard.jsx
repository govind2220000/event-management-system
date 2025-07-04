import React, { useEffect, useState, useContext } from "react";
import { apiRequest } from "../api/api";
import { AuthContext } from "../context/AuthContext.jsx";
import UserInfo from "../components/UserInfo.jsx";
import { format } from "date-fns";
import AdminDashboardButton from "../components/AdminDashboardButton.jsx";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const { user, token, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [locations, setLocations] = useState([]);
  const [createForm, setCreateForm] = useState({
    title: "",
    description: "",
    date: "",
    category: "",
    locationId: ""
  });
  const [createError, setCreateError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const EVENTS_PER_PAGE = 5;
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({ id: null, title: "", description: "", date: "", category: "", locationId: "" });
  const [editError, setEditError] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  // Fetch all events
  useEffect(() => {
    if (!user || user.role !== "admin" || !token) return;
    apiRequest("/events", "GET", null, token)
      .then(setEvents)
      .catch((err) => alert(err.message));
  }, [user, token]);

  // Fetch locations for dropdown
  useEffect(() => {
    if (!user || user.role !== "admin" || !token) return;
    apiRequest("/events/locations", "GET", null, token)
      .then(setLocations)
      .catch(() => setLocations([]));
  }, [user, token]);

  // Fetch registrations for selected event (with user details)
  const handleViewRegistrations = async (eventId) => {
    setSelectedEvent(eventId);
    try {
      const res = await apiRequest(`/events/${eventId}/registrations`, "GET", null, token);
      setRegistrations(res);
    } catch (err) {
      alert(err.message);
    }
  };

  // Delete event with confirmation
  const handleDelete = async () => {
    try {
      await apiRequest(`/events/${deleteId}`, "DELETE", null, token);
      setEvents(events.filter(e => e.id !== deleteId));
      setShowModal(false);
      setDeleteId(null);
    } catch (err) {
      alert(err.message);
    }
  };

  // Handle create event form submit
  const handleCreateEvent = async (e) => {
    e.preventDefault();
    setCreateError("");
    if (!createForm.title || !createForm.description || !createForm.date || !createForm.category || !createForm.locationId) {
      setCreateError("All fields are required.");
      return;
    }
    try {
      // Convert local datetime to UTC ISO string
      const utcDate = new Date(createForm.date).toISOString();
      const newEvent = await apiRequest("/events", "POST", {
        ...createForm,
        date: utcDate,
        locationId: Number(createForm.locationId)
      }, token);
      setEvents([newEvent, ...events]);
      setShowCreateModal(false);
      setCreateForm({ title: "", description: "", date: "", category: "", locationId: "" });
    } catch (err) {
      setCreateError(err.message || "Failed to create event.");
    }
  };

  // Open edit modal with event data
  const handleEditClick = (event) => {
    // Convert UTC date to local datetime-local string
    const localDate = new Date(event.date);
    const tzOffset = localDate.getTimezoneOffset() * 60000;
    const localISO = new Date(localDate - tzOffset).toISOString().slice(0, 16);
    setEditForm({
      id: event.id,
      title: event.title,
      description: event.description,
      date: localISO, // for datetime-local input
      category: event.category,
      locationId: event.locationId
    });
    setEditError("");
    setShowEditModal(true);
  };

  // Handle edit event form submit
  const handleEditEvent = async (e) => {
    e.preventDefault();
    setEditError("");
    if (!editForm.title || !editForm.description || !editForm.date || !editForm.category || !editForm.locationId) {
      setEditError("All fields are required.");
      return;
    }
    try {
      // Convert local datetime to UTC ISO string
      const utcDate = new Date(editForm.date).toISOString();
      const updatedEvent = await apiRequest(`/events/${editForm.id}`, "PUT", {
        title: editForm.title,
        description: editForm.description,
        date: utcDate,
        category: editForm.category,
        locationId: Number(editForm.locationId)
      }, token);
      setEvents(events.map(e => e.id === updatedEvent.id ? updatedEvent : e));
      setShowEditModal(false);
    } catch (err) {
      setEditError(err.message || "Failed to update event.");
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(events.length / EVENTS_PER_PAGE);
  const paginatedEvents = events.slice(
    (currentPage - 1) * EVENTS_PER_PAGE,
    currentPage * EVENTS_PER_PAGE
  );

  if (loading) return <div>Loading...</div>;
  if (!user || user.role !== "admin") return null;

  return (
    <>
      <div className="fixed top-4 right-4 flex items-center z-50">
        <UserInfo />
        <AdminDashboardButton />
      </div>
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>
        <button
          className="mb-4 bg-green-600 text-white px-4 py-2 rounded shadow"
          onClick={() => setShowCreateModal(true)}
        >
          Create Event
        </button>
        {/* Event List */}
        <h2 className="text-lg font-semibold mb-2">All Events</h2>
        <ul>
          {paginatedEvents.map(event => (
            <li key={event.id} className="mb-2 border p-2 rounded flex justify-between items-center">
              <div>
                <div className="font-semibold">Event Name: {event.title}</div>
                <div>Event Date: {format(new Date(event.date), "PPP p")}</div>
                <div>Event Location: {event.location?.name}</div>
                <div>Event Category: {event.category}</div>
              </div>
              <div className="flex gap-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() => handleViewRegistrations(event.id)}
                >
                  View Registrations
                </button>
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                  onClick={() => handleEditClick(event)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => { setShowModal(true); setDeleteId(event.id); }}
                >
                  Delete
                </button>
              </div>
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
        {/* Registrations List */}
        {selectedEvent && (
          <div className="mt-6">
            <h3 className="text-md font-bold mb-2">Registrations for Event #{selectedEvent}</h3>
            <ul>
              {registrations.length === 0 && <li>No registrations yet.</li>}
              {registrations.map(reg => (
                <li key={reg.id} className="border-b py-1">
                  Name: {reg.user?.name} | Email: {reg.user?.email} | Role: {reg.user?.role} | Status: {reg.status}
                </li>
              ))}
            </ul>
            <button className="mt-2 text-blue-600" onClick={() => setSelectedEvent(null)}>
              Close
            </button>
          </div>
        )}
        {/* Delete Confirmation Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm transition-all z-50">
            <div className="bg-white p-6 rounded shadow">
              <p>Are you sure you want to delete this event?</p>
              <div className="flex gap-2 mt-4">
                <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleDelete}>
                  Yes, Delete
                </button>
                <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Create Event Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm transition-all z-50">
            <div className="bg-white p-6 rounded shadow max-w-md w-full">
              <h2 className="text-lg font-bold mb-4">Create Event</h2>
              <form onSubmit={handleCreateEvent} className="space-y-3">
                <div>
                  <label className="block font-semibold">Title</label>
                  <input
                    className="w-full border rounded px-2 py-1"
                    value={createForm.title}
                    onChange={e => setCreateForm(f => ({ ...f, title: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold">Description</label>
                  <textarea
                    className="w-full border rounded px-2 py-1"
                    value={createForm.description}
                    onChange={e => setCreateForm(f => ({ ...f, description: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold">Date</label>
                  <input
                    type="datetime-local"
                    className="w-full border rounded px-2 py-1"
                    value={createForm.date}
                    onChange={e => setCreateForm(f => ({ ...f, date: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold">Category</label>
                  <input
                    className="w-full border rounded px-2 py-1"
                    value={createForm.category}
                    onChange={e => setCreateForm(f => ({ ...f, category: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold">Location</label>
                  <select
                    className="w-full border rounded px-2 py-1"
                    value={createForm.locationId}
                    onChange={e => setCreateForm(f => ({ ...f, locationId: e.target.value }))}
                    required
                  >
                    <option value="">Select a location</option>
                    {locations.map(loc => (
                      <option key={loc.id} value={loc.id}>{loc.name} ({loc.city})</option>
                    ))}
                  </select>
                </div>
                {createError && <div className="text-red-600 text-sm">{createError}</div>}
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    className="bg-gray-300 px-4 py-2 rounded"
                    onClick={() => setShowCreateModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* Edit Event Modal */}
        {showEditModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm transition-all z-50">
            <div className="bg-white p-6 rounded shadow max-w-md w-full">
              <h2 className="text-lg font-bold mb-4">Edit Event</h2>
              <form onSubmit={handleEditEvent} className="space-y-3">
                <div>
                  <label className="block font-semibold">Title</label>
                  <input
                    className="w-full border rounded px-2 py-1"
                    value={editForm.title}
                    onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold">Description</label>
                  <textarea
                    className="w-full border rounded px-2 py-1"
                    value={editForm.description}
                    onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold">Date</label>
                  <input
                    type="datetime-local"
                    className="w-full border rounded px-2 py-1"
                    value={editForm.date}
                    onChange={e => setEditForm(f => ({ ...f, date: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold">Category</label>
                  <input
                    className="w-full border rounded px-2 py-1"
                    value={editForm.category}
                    onChange={e => setEditForm(f => ({ ...f, category: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold">Location</label>
                  <select
                    className="w-full border rounded px-2 py-1"
                    value={editForm.locationId}
                    onChange={e => setEditForm(f => ({ ...f, locationId: e.target.value }))}
                    required
                  >
                    <option value="">Select a location</option>
                    {locations.map(loc => (
                      <option key={loc.id} value={loc.id}>{loc.name} ({loc.city})</option>
                    ))}
                  </select>
                </div>
                {editError && <div className="text-red-600 text-sm">{editError}</div>}
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    className="bg-gray-300 px-4 py-2 rounded"
                    onClick={() => setShowEditModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AdminDashboard; 