# Use a Debian-based Node.js base image
FROM node:18-slim

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy the rest of the project
COPY . .

# TypeScript type checking
RUN npx tsc --skipLibCheck --noEmit

# Build with Vite
RUN npx vite build

# Expose port
EXPOSE 5173

# Run the app
CMD ["npx", "vite", "preview"]
