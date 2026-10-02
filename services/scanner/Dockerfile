FROM node:20-slim AS builder

WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
COPY src ./src
RUN npm install && npm run build

FROM debian:bookworm-slim

# Install ClamAV and Node.js
RUN apt-get update && apt-get install -y --no-install-recommends \
    clamav-daemon \
    clamav-freshclam \
    curl \
    ca-certificates \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# Update virus definitions initially
RUN freshclam || true

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

# Startup script to run clamd in background then start Node.js server
CMD ["sh", "-c", "service clamav-daemon start && node dist/server.js"]
