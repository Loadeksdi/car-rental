FROM node:lts-alpine

WORKDIR /usr

COPY ["package.json", "tsconfig.json", ".env", "./"]

RUN npm install -g pnpm

RUN pnpm i

COPY src ./src

RUN pnpm run build

EXPOSE 3000

CMD [ "node", "dist/index.js" ]