# BUILD
FROM node:12.4-alpine as build
ARG BUILD_COMMAND="build-staging"

WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
RUN npm ci

COPY . ./

RUN yarn $BUILD_COMMAND

# PACKAGE
FROM nginx:1.17.8-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
WORKDIR /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
