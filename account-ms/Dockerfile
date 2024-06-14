FROM node:18.17.1-bullseye
RUN mkdir -p /app/account-ms
WORKDIR /app/account-ms
ADD . /app/account-ms

RUN npm install

RUN npx prisma generate

EXPOSE 3001

# CMD npm run migrate:db && npm run build && npm run start:prod
CMD npm run migrate:db && npm run start:dev