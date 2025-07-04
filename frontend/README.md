# Event Management System – Frontend

## Overview
This is the frontend for the Event Management System, built with React and Vite. It connects to the backend API for authentication, event management, and registration features.

---

## Prerequisites
- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/) & Docker Compose (for full stack)

---

## Getting Started (with Docker)

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd Event-Management-System
   ```
2. **Start all services:**
   ```sh
   docker-compose up --build
   ```
   - The frontend will be available at [http://localhost:3000](http://localhost:3000)
   - The backend API will be at [http://localhost:5000](http://localhost:5000)

---

## Running Locally (Frontend Only)

1. **Install dependencies:**
   ```sh
   cd frontend
   npm install
   ```
2. **Start the development server:**
   ```sh
   npm run dev
   ```
   - The app will run at [http://localhost:3000](http://localhost:3000)

---

## Usage
- Register or log in using the seeded test users (see backend/README.md for credentials).
- Browse events, view event details, and register for events.
- Admin users can create and manage events (see backend/README.md for seeded admin credentials).

---

## API Reference & Seed Data
- See [../backend/README.md](../backend/README.md) for API endpoints and seeded test data.

---

## Troubleshooting
- If you encounter CORS or connection issues, ensure the backend is running and accessible at the expected URL.
- For full stack, always use Docker Compose for easiest setup.

---

## License
MIT
