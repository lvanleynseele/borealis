FROM --platform=linux/arm64/v8 node:latest AS base

WORKDIR /app

COPY . .
# COPY package.json yarn.lock tsconfig.json index.ts ./ 

RUN yarn install

COPY . .

CMD [ "yarn", "start" ]

