# Use Node.js base image
FROM node:latest

# Set working directory
WORKDIR /app

# Copy and install backend dependencies
COPY package*.json ./
RUN npm install

# Copy backend code
COPY . .

# Expose the port
EXPOSE 3000

# Start the app
CMD ["node", "server.js"]
