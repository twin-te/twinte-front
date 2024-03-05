FROM node:16 AS builder
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

ENV VITE_APP_URL=https://app.dev.twinte.net
ENV VITE_API_URL=https://app.dev.twinte.net/api/v3

COPY . ./
RUN yarn build:staging

FROM nginx
COPY production_nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
