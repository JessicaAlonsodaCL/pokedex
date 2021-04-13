FROM node:12.16.0
COPY . /pokedex
WORKDIR /pokedex
RUN npm install 
RUN npm run build
CMD [ "npm", "run", "serve" ]