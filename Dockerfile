FROM node:22-alpine

# Install system dependencies
# - git: for 'simple-git' and yarn dependencies
# - python3: for 'xlsform-converter' scripts
# - openjdk17-jre: for ODK tools (often java-based) within workflows
# - build-base: for compiling any native Node.js addons
RUN apk add --no-cache git python3 openjdk17-jre build-base

WORKDIR /app

# Enable Corepack for Yarn Berry support
RUN corepack enable

# Copy the entire project context into the container
COPY . .

# Install all dependencies (including devDependencies for ts-node/building)
RUN yarn install --immutable

# Expose the standard development ports
EXPOSE 4200 8100
