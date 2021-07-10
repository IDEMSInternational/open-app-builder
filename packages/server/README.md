## Server

The Apps Server contains various docker containers for managing IDEMS Apps, including:

- Postgres App DB
- Adminer DB Admin
- Metabase DB Dashboard
- Nginx Web Server
- Matomo Analytics (Dashboard + DB + Webserver)

## Configure Environment Variables
Copy the sample environemnt file
```bash
cp .env.sample .env
```
Default values in [.env](./.env) should be changed when running in production

## Running Locally
1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop   )

2. Use the start script
```bash
# From server directory
npm run start

# From parent directory
yarn workspace server start
```


## Server Deployment
The easiest way to deploy on a standalone server is via [Swarmlet](https://swarmlet.dev/docs) - an automation service that handles installing and managing docker containers

Note - If installing via swarmlet it is also possible to omit Matomo and Nginx containers and use services provided by swarmlet instead.