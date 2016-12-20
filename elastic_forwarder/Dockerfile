FROM node:6.9.2-slim
COPY config.json .
COPY package.json .
COPY app.js .
RUN npm install

CMD ["node", "app.js", "docker", "http://elk:9200/tweets/tweet/"]
