FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN corepack enable
RUN yarn install
COPY . .
RUN yarn build


FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
