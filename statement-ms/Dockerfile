FROM node:18.17.1-bullseye
RUN mkdir -p /app/statement-ms
WORKDIR /app/statement-ms
ADD . /app/statement-ms

RUN npm install

RUN npx prisma generate

EXPOSE 3003

CMD npm run migrate:db && npm run start:dev