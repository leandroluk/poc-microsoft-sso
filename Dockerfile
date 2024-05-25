FROM node:16-bullseye-slim AS builder
WORKDIR /app
COPY . .
RUN \
  npm install --frozen-lockfile && \
  npm build

FROM node:16-bullseye-slim AS runner
WORKDIR /app
ENV \
  # APP
  NODE_ENV="development" \
  PORT="3000" \
  TZ="UTC"
# other env vars goes here
COPY --from=builder /app/.tmp/dist/ /app/
EXPOSE ${PORT}
CMD node index.js