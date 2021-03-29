FROM node:14 AS builder
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . ./
RUN yarn build

FROM nginx
COPY --from=builder /app/dist /usr/share/nginx/html
