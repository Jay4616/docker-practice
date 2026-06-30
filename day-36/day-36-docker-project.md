# Day 36 – Docker Project: Dockerize a Full Application

## 1. Chosen Application
I chose a **Node.js Express app with a MongoDB database backend**. I selected this stack because it represents a classic modern full-stack web application structure, allowing me to practice multi-stage compression while managing data persistence.

## 2. Production Dockerfile
```dockerfile
# Stage 1: Build environment
FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install

# Stage 2: Minimal production runtime environment
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./
COPY server.js ./

# Security best practice: Run application using non-root user
USER node

EXPOSE 3000
CMD ["node", "server.js"]
