# Use a recent Node.js version
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy app source
COPY . .

# Expose API port
EXPOSE 4000

# Start backend
CMD ["node", "server.js"]
