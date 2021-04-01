FROM node:14 AS builder
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

ENV VITE_API_URL=https://app.twinte.net/api/v3

COPY . ./
RUN yarn build

FROM nginx
COPY production_nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
