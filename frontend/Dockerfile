FROM node:latest

WORKDIR /frontend

COPY . /frontend

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

EXPOSE 8000

CMD [ "npm", "start" ]