
FROM node:18.17.1-bullseye
RUN mkdir -p /app/api-gateway
WORKDIR /app/api-gateway
ADD . /app/api-gateway

RUN npm install

EXPOSE 3000

# CMD npm run build && npm run start:prod
CMD npm run start:dev