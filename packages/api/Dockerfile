# Adapted from: https://blog.logrocket.com/containerized-development-nestjs-docker/
# and: https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
# and: https://dev.to/abbasogaji/how-to-dockerize-your-nestjs-app-for-production-2lmf

# Standalone dashboard docker build (no api required)
# $docker build -f docker/DOCKERFILE --tag idems/apps-api .
# $docker run -p 80:80 --name apps-api --rm idems/apps-api

### STAGE 1: Build ###
FROM node:12.22-alpine AS build-env
# Set working directory
WORKDIR /usr/src/app
# Add node_modules to path
ENV PATH="./node_modules/.bin:$PATH"
# Copy dependency files to allow caching
COPY ./package.json ./
# Include lock file
# NOTE - not currently supported in as docker can't access top-level yarn lock for monorepo 
# https://github.com/yarnpkg/yarn/issues/5428 and https://stackoverflow.com/questions/24537340/docker-adding-a-file-from-a-parent-directory
# COPY ./yarn.lock ./
RUN yarn install --frozen-lockfile
# Copy rest of app files
COPY . .
# Build
RUN npm run build
# TODO - reduce image size removing dev deps, e.g. `npm prune --production` (seems to be causing error)


### STAGE 2: Serve Dashboard ###
FROM node:12.22-alpine as prod-env
# Set working directory
WORKDIR /usr/src/app
# Set default production environment variable
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
# Copy build dist files and runtime node_modules
COPY --from=build-env /usr/src/app/dist ./dist
COPY --from=build-env /usr/src/app/node_modules ./node_modules
# Run the server
EXPOSE 3000
# Add custom healthcheck
HEALTHCHECK --interval=12s --timeout=12s --start-period=30s \  
    CMD node dist/healthcheck.js
# Start server command 
CMD ["node", "dist/main"]
