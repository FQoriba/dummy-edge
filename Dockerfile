FROM node:12 AS build

WORKDIR /srv
COPY . /srv/

RUN npm install

FROM alpine:3
RUN apk add nodejs --no-cache
WORKDIR /srv
COPY --from=build /srv/ /srv/

ENV NODE_ENV production

EXPOSE 3000

CMD ["npm", "start"]
