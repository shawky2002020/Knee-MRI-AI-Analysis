# Use an official Node.js runtime as a parent image
FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose the backend port (change 3000 if your server uses a different port)
EXPOSE 3000

# Start the server
CMD ["node", "server.mjs"]