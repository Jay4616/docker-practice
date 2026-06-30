# --- STAGE 1: The Builder Environment ---
FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
# Only install dependencies here
RUN npm install

# --- STAGE 2: The Ultra-Lightweight Runtime ---
FROM node:20-alpine
WORKDIR /app

# Safely copy only the essential modules and files from Stage 1
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./
COPY server.js ./

EXPOSE 3000

CMD ["node", "server.js"]
