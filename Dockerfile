FROM --platform=linux/arm64/v8 node:20 as base

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

CMD [ "yarn", "start" ]



