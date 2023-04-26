#Build

FROM node:18-alpine AS create-build
WORKDIR /app
RUN npm install -g npm@9.6.5
COPY package.json package-lock.json /app/
RUN npm ci
COPY . .
RUN npm run build


CMD ["npm", "run", "start:prod"]
