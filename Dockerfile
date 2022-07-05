FROM arm64v8/ubuntu
#FROM ubuntu
SHELL [ "/bin/bash", "--login", "-c" ]
RUN apt update
RUN apt install nodejs -y
RUN nodejs -v
RUN apt install npm -y
RUN npm install pm2 -g

# Setup project structure
COPY backend/public /app/public
COPY backend/routes /app/routes
COPY backend/views /app/views
COPY backend/backend.js /app/backend.js
COPY backend/server.js /app/server.js

COPY package-lock.json /app/package-lock.json
COPY package.json /app/package.json

WORKDIR /app

# Build project code (in the image itself)
RUN npm ci

# specify the command to run when the image is started
CMD npm run production