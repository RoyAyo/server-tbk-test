FROM --platform=linux/amd64 node:18-alpine
ENV PORT=3000

WORKDIR app
COPY . .

COPY package.json .
COPY package-lock.json .

RUN npm ci

EXPOSE $PORT
RUN npm run build

CMD [ "npm", "start" ]