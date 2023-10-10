FROM --platform=linux/arm64/v8 node:latest AS base

WORKDIR /app

COPY . .

RUN yarn install

COPY . .

CMD [ "yarn", "start" ]

