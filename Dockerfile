# Base Image
FROM node:22-alpine

# Create working directory
WORKDIR /app

ENV NODE_ENV=production

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy project files
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Expose application port
EXPOSE 3000

# Start application
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]