FROM node:17.0.1 as build
#ENV NODE_ENV=production
WORKDIR /usr/local/app
#COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

# Add the source code to app
COPY ./ /usr/local/app/

# Install all the dependencies
RUN npm install

# Generate the build of the application
RUN npm run build

#RUN npm install --production --silent && mv node_modules ../
#COPY . .
#EXPOSE 3000
#RUN chown -R node /usr/src/app
#USER node
#CMD ["npm", "start"]


FROM nginx
COPY ./data/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./data/certs/SSLcertificate.crt /etc/nginx/certs/SSLcertificate.crt
COPY ./data/certs/SSLprivatekey.key /etc/nginx/certs/SSLprivatekey.key
COPY --from=build /usr/local/app/dist/vinomio-app /usr/share/nginx/html
EXPOSE 1443:443