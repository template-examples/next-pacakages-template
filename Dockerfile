FROM node:alpine AS base
RUN apk add --no-cache libc6-compat rsync \
    && corepack enable \
    && corepack prepare pnpm@10.15.1 --activate
WORKDIR /app

FROM base AS deps
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY app/package.json ./app/
RUN pnpm install --frozen-lockfile

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

FROM base AS runner
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs
COPY --from=build /app .
USER nextjs
WORKDIR /app/app
ENV NODE_ENV=production \
    HOSTNAME="0.0.0.0"
CMD ["pnpm", "start"]
