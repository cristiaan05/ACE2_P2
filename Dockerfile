# Development stage
FROM node:18.12.1 as development
WORKDIR /usr/src/app
COPY package*.json tsconfig.json ./
RUN npm install
COPY ./src ./src
CMD [ "npm", "run", "start:dev" ]

# Builder stage
FROM development as builder
WORKDIR /usr/src/app
# Copy .env again because the next stages do not inherit the previous ones directly
COPY .env ./
# Build the app with devDependencies still installed from "development" stage
RUN npm run build
# Clear dependencies and reinstall for production (no devDependencies)
RUN rm -rf node_modules
RUN npm ci --only=production

# Production stage
FROM alpine:latest as production
RUN apk --no-cache add nodejs ca-certificates
WORKDIR /root/
COPY --from=builder /usr/src/app ./
CMD [ "node", "./build/index.js" ]