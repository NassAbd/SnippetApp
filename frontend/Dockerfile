# Use a recent Node.js version (Vite requires Node >=20.19)
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies separately for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Start Vite in dev mode, bind to 0.0.0.0 for container access
CMD ["npm", "run", "dev", "--", "--host"]
