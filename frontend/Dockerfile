# frontend/Dockerfile - Next.js Frontend

FROM node:20-alpine AS base

# Install ALL dependencies (needed for build)
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install all dependencies (needed for TypeScript, ESLint, etc. during build)
RUN npm ci

# Install only production dependencies (for final image)
FROM base AS production-deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./

# Install production dependencies only
RUN npm ci --omit=dev && \
    npm cache clean --force

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Build arguments
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_SITE_URL

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

# Copy all dependencies for building
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects anonymous telemetry data about general usage.
ENV NEXT_TELEMETRY_DISABLED 1

# Build Next.js application (disable source maps to reduce size)
ENV NEXT_DISABLE_SOURCE_MAPS=1
RUN npm run build && \
    # Clean up to reduce image size
    rm -rf .next/cache \
    node_modules/.cache

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED 1

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy only necessary public files (not everything)
COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next && chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# Standalone already includes minimal node_modules
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

CMD ["node", "server.js"]
