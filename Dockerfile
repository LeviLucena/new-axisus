# Use Node 18 Alpine as base for build
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies using npm
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage - use nginx to serve the static files
FROM nginx:alpine AS production

# Copy built application to nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]