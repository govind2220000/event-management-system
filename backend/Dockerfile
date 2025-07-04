FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Force Prisma Client regeneration for Linux environment
RUN rm -rf node_modules/.prisma && \
    rm -rf node_modules/@prisma/client && \
    npm install && \
    npx prisma generate

EXPOSE 5000

# Use a startup script to handle migrations and seeding
CMD ["sh", "-c", "npx prisma migrate deploy && npm run seed && npm start"] 