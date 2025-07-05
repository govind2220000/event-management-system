# Event Management System

A full-stack event management platform with a React frontend and Node.js/Express/Prisma backend, powered by PostgreSQL.

---

## Demo
Watch the project demo: [Event Management System Demo](https://drive.google.com/file/d/1UrkKufb_ciVG4EieoM3VEJPGY-McJQDK/view?usp=sharing)

---

## Prerequisites
- [Docker](https://www.docker.com/) & Docker Compose
- Node.js (for local development, optional)

---

## Quick Start (Recommended: Docker Compose)

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd Event-Management-System
   ```
2. **Start all services:**
   ```sh
   docker-compose up --build
   ```
   - This will build and start the backend, frontend, and database.
   - The backend will run migrations and seed the database with test data.
3. **Access the app:**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:5000](http://localhost:5000)

---

## Running Locally (Without Docker)

### Backend
1. ```sh
   cd backend
   npm install
   # Create a .env file in backend/ with the following content:
   #
   # DATABASE_URL="postgresql://eventadmin:eventpass@db:5432/eventdb"
   # JWT_SECRET=supersecretkey
   #
   npx prisma migrate dev
   npm run seed
   npm start
   ```

### Frontend
1. ```sh
   cd frontend
   npm install
   npm run dev
   ```
   - The frontend will run on [http://localhost:3000](http://localhost:3000)

---

## Seeded Test Data

After running the seed script, the following data is available for testing:

### Users
| Name         | Email                    | Password       | Role  |
|--------------|--------------------------|---------------|-------|
| Alice Admin  | alice.admin@example.com  | alicepassword | admin |
| Bob User     | bob.user@example.com     | bobpassword   | user  |

### Locations
| Name              | Address         | City         | State | Country |
|-------------------|----------------|--------------|-------|---------|
| Tech Park         | 123 Main St    | San Francisco| CA    | USA     |
| Convention Center | 456 Elm St     | New York     | NY    | USA     |
| Summit Arena      | 789 Oak St     | Los Angeles  | CA    | USA     |
| Vision Hall       | 101 Pine St    | Chicago      | IL    | USA     |

### Events
| Title           | Description            | Date         | Category | Location           | Created By     |
|-----------------|------------------------|--------------|----------|--------------------|----------------|
| React Workshop  | Learn React basics     | 2025-02-01   | Workshop | Tech Park          | Alice Admin    |
| SQL Mastery     | Advanced SQL techniques| 2025-02-15   | Seminar  | Convention Center  | Alice Admin    |

### Event Registrations
| User      | Event           |
|-----------|----------------|
| Bob User  | React Workshop |
| Bob User  | SQL Mastery    |

---

## Project Structure
- `backend/` – Node.js, Express, Prisma, PostgreSQL
- `frontend/` – React, Vite
- `docker-compose.yml` – Orchestrates the full stack

---

## Useful Commands
- `docker-compose up --build` – Start all services
- `docker-compose down` – Stop and remove all containers
- `npm run seed` (in backend) – Reseed the database

---

## Troubleshooting
- If you change the Prisma schema, re-run migrations and re-seed the database.
- If you encounter connection issues, ensure your `DATABASE_URL` matches your Docker Compose settings.

---
