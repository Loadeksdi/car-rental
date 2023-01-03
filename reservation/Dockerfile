FROM node:lts-alpine
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "pnpm-lock.yaml*", "tsconfig.json", "./"]

RUN npm install -g pnpm

COPY src /app/src

RUN pnpm i

RUN pnpm run build

CMD [ "node", "dist/index.js" ]