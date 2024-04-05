# Use the official Node.js image with Alpine Linux as the base image
FROM node:alpine

# Set the working directory inside the container
WORKDIR /user/src/app

# Copy package.json and package-lock.json (or package*.json) to the working directory
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy all files from the current directory to the working directory inside the container
COPY . .

# Expose port 5173 to allow outside access to your application
EXPOSE 5173

# Define the command to run your application, in this case, starting the development server
CMD ["npm", "run", "dev"]
