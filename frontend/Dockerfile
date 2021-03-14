FROM node

COPY . /code/

WORKDIR /code
RUN npm install
RUN npm run build

CMD ["npm", "run", "start"]