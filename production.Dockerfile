FROM node:16 AS builder
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

ENV VITE_APP_URL=https://app.twinte.net
ENV VITE_API_URL=https://app.twinte.net/api/v3

COPY . ./
RUN --mount=type=secret,id=SENTRY_AUTH_TOKEN \
    SENTRY_AUTH_TOKEN=$(cat /run/secrets/SENTRY_AUTH_TOKEN) \
    yarn build:production

FROM nginx
COPY production_nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
