FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE ${PORT:-3042}
CMD npm run preview -- --host 0.0.0.0 --port ${PORT:-3042}