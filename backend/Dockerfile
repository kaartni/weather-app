FROM node:latest

WORKDIR /backend

COPY . /backend

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

EXPOSE 9000

CMD [ "npm", "start" ]
