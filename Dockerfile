FROM node:20 AS frontend
WORKDIR app/client

COPY client/package*.json ./
RUN npm install

COPY client/ ./
RUN npm run build

FROM node:20
WORKDIR /app/server

COPY server/package*.json ./
RUN npm install

COPY server/ ./
COPY --from=frontend /app/client/dist ./dist

CMD ["npm", "start"]