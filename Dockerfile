FROM node:18

RUN npm install -g pnpm@9.1.1

WORKDIR /app

COPY package*.json ./

RUN pnpm install

COPY . .

RUN pnpm prisma generate

CMD ["pnpm", "start"]