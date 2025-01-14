# https://pnpm.io/docker
# https://static-web-server.net/features/docker

FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

FROM joseluisq/static-web-server:2
COPY --from=build /app/dist /app/public
WORKDIR /app

CMD ["--page-fallback", "/app/public/index.html"]
