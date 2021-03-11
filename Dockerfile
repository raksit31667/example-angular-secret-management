FROM node:10-alpine as builder
COPY package.json yarn.lock ./
RUN yarn && mkdir /app && mv ./node_modules ./app
WORKDIR /app
COPY . .
RUN node_modules/.bin/ng build --prod

FROM nginx:alpine as server
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist/example-angular-order /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]


