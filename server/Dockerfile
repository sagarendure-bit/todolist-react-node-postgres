
# -----------------------------
# Stage 1: Install dependencies
# -----------------------------
FROM node:20-alpine AS dependencies

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev


# -----------------------------
# Stage 2: Production image
# -----------------------------
FROM node:20-alpine AS production

ENV NODE_ENV=production

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

EXPOSE 8080

USER node

CMD ["node", "index.js"]
