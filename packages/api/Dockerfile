# Adapted from: https://blog.logrocket.com/containerized-development-nestjs-docker/
# and: https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
# and: https://dev.to/abbasogaji/how-to-dockerize-your-nestjs-app-for-production-2lmf

# Standalone dashboard docker build (no api required)
# $docker build --tag idems/apps-api .
# $docker run -p 80:80 --name apps-api --rm idems/apps-api

### STAGE 1: Build ###
FROM node:18-alpine AS build-env
# Set working directory
WORKDIR /usr/app/api
# Add node_modules to path
ENV PATH="./node_modules/.bin:$PATH"
# Copy dependency files to allow caching (TODO - will be broken by package.json version update so better to define and share)
COPY ./package.json ./
# Include lock file
# NOTE - not currently supported in as docker can't access top-level yarn lock for monorepo 
# https://github.com/yarnpkg/yarn/issues/5428 and https://stackoverflow.com/questions/24537340/docker-adding-a-file-from-a-parent-directory
# COPY ./yarn.lock ./

# Upgrade to yarn berry, set nodeLinker config and add production-install plugin
RUN corepack enable && \
    yarn set version 3.3.1 && \
    echo "nodeLinker: node-modules" > .yarnrc.yml && \
    yarn install
# Copy rest of app files required for build
COPY ["nest-cli.json", "package.json", "tsconfig.build.json", "tsconfig.json", "./"]
COPY src src
# Build
RUN yarn build
# Add secondary set of production-only node_modules to dist (not sure why yarn berry needs re-init but seems to be the case)
# NOTE - if updating to yarn 4 will require additional plugin import line
RUN yarn set version 3.3.1 && \
    # yarn plugin import workspace-tools && \
    yarn workspaces focus api --production

### STAGE 2: Serve Dashboard ###
FROM node:18-alpine as prod-env
# Set working directory
WORKDIR /usr/app/api
# Set default production environment variable
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
# Copy build dist files and runtime node_modules
COPY --from=build-env /usr/app/api/dist/src ./dist
COPY --from=build-env /usr/app/api/dist/package.json .
COPY --from=build-env /usr/app/api/node_modules ./dist/node_modules
# Run the server
EXPOSE 3000
# Add custom healthcheck
HEALTHCHECK --interval=12s --timeout=12s --start-period=30s \  
    CMD node dist/healthcheck.js
# Start server command 
CMD ["node", "dist/main.js"]
