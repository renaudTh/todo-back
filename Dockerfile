#Install dependencies

FROM node:18-alpine AS install-dependencies
WORKDIR /app
RUN npm install -g npm@latest
COPY package.json package-lock.json /app/
RUN npm ci
COPY . .

#build
FROM node:18-alpine AS create-build
WORKDIR /app
RUN npm install -g npm@latest
COPY --from=install-dependencies /app ./
RUN npm run build
USER node  


CMD ["npm", "run", "start:prod"]
