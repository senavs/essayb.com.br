FROM node

ENV PORT=8080

COPY . /code/

WORKDIR /code
RUN npm install
RUN npm run build

RUN npm install -g serve

RUN rm -rf public src node_modules

CMD ["serve", "-l", "8080", "-s", "build"]