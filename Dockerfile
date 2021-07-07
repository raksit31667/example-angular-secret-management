FROM node:10-alpine as builder
COPY package.json yarn.lock ./
RUN yarn && mkdir /app && mv ./node_modules ./app
WORKDIR /app
COPY . .
RUN yarn build

FROM nginx:alpine as server
COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist/example-angular-order /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]


