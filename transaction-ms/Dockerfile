FROM node:18.17.1-bullseye
RUN mkdir -p /app/transaction-ms
WORKDIR /app/transaction-ms
ADD . /app/transaction-ms

RUN npm install

RUN npx prisma generate

EXPOSE 3002

CMD npm run migrate:db && npm run start:dev