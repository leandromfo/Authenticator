FROM node:20.15.0-slim AS base

WORKDIR /home

FROM base AS build
COPY . .
RUN npm ci
RUN npm run build

FROM base AS dev
COPY . .
RUN npm ci

FROM base AS prod
COPY package.json .
COPY package-lock.json .
RUN npm ci --omit=dev
COPY --from=build ./home/dist ./dist