FROM node:18-slim

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install --production

# Bundle app source
COPY . .

ENV PORT=3000
EXPOSE 3000

CMD ["node", "server.js"]
