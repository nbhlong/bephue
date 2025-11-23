# backend/Dockerfile - Strapi CMS

FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /opt/app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci --omit=dev

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /opt/app

COPY --from=deps /opt/app/node_modules ./node_modules
COPY . .

# Build Strapi admin panel
ENV NODE_ENV=production
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /opt/app

ENV NODE_ENV=production

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs && \
  adduser --system --uid 1001 strapi

# Copy built application
COPY --from=builder --chown=strapi:nodejs /opt/app ./

# Expose Strapi port
EXPOSE 1337

# Set user
USER strapi

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD node -e "require('http').get('http://localhost:1337/admin', (r) => {process.exit([200, 403, 404].includes(r.statusCode) ? 0 : 1)})"

# Start Strapi
CMD ["npm", "run", "start"]
