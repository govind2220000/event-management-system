## Running Locally (without Docker)

1. **Install dependencies:**
   ```sh
   cd backend
   npm install
   ```
2. **Create a `.env` file in the backend directory with the following content:**
   ```env
   DATABASE_URL="postgresql://eventadmin:eventpass@db:5432/eventdb"
   JWT_SECRET=supersecretkey
   ```
3. **Run migrations and seed:**
   ```sh
   npx prisma migrate dev
   npm run seed
   ```
4. **Start the server:**
   ```sh
   npm start
   ``` 