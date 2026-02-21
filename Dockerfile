FROM node:alpine AS base
RUN apk add --no-cache libc6-compat rsync \
    && corepack enable \
    && corepack prepare pnpm@latest --activate
WORKDIR /app

FROM base AS deps
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY app/package.json ./app/
RUN pnpm install --frozen-lockfile

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

FROM node:alpine AS runner
RUN apk add --no-cache libc6-compat \
    && corepack enable \
    && corepack prepare pnpm@latest --activate \
    && addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

WORKDIR /app
COPY --from=build --chown=nextjs:nodejs /app .

USER nextjs
WORKDIR /app/app
ENV NODE_ENV=production \
    HOSTNAME="0.0.0.0" \
    PORT=3000
CMD ["pnpm", "start"]
