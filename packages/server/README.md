## Server

The Apps Server contains various docker containers for managing IDEMS Apps, including:

- Postgres App DB
- Adminer DB Admin
- Metabase DB Dashboard
- Nginx Web Server
- Matomo Analytics (Dashboard + DB + Webserver)

## Configure Environment Variables
Copy the sample environment file
```bash
cp .env.example .env
```
Default values in [.env](./.env) should be changed when running in production

Similarly, the api package should have corresponding environment variables set
```bash
cp ../api/.env.example ../api/.env
```

Matomo analytics can be configured in the file [./docker/config/matomo_config/config.ini.php](./docker/config/matomo_config/config.ini.php).
Note - this file will only be populated after initial config has been completed from within the webbrowser running the app

## Build API
This will create a docker image from the local api workspace. It should be rebuilt
whenever changed
```
yarn workspace api docker:build
```

## Running Locally
1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop   )

2. Use the start script
```bash
# From server directory
yarn start

# From parent directory
yarn workspace server start
```

You should be able to access the dashboard at http://localhost (will redirect)


## Application Configs

### Adminer DB Admin
http://localhost/dbadmin/

Login details
```
System: PostgreSQL
Server: db
Username: (POSTGRES_USER in .env)
Password: (POSTGRES_PASS in .env)
Database: (blank)
```
You should already see app and metabase databases created via the initialisation script [docker/config/db/init.sh](./docker/config/db/init.sh)

Note - as these scripts only ever run on first initialisation, if adjustments need to be made then SQL can be executed from within Adminer in a similar way as the scripts

### Pgadmin DB Admin
http://localhost/pgadmin/

Use same configuration as adminer db above

### Api
http://localhost/api/

The api page should load with an overview of all available endpoints for reference and testing. No additional configuration is required, however you could test populating a new app user via the `/app_users/` POST interface.

### Metabase DB Dashboard
http://localhost/dashboard/

A new database will need to be created to allow access for metabase. This should be automatically configured in [docker/config/db/init.sh](./docker/config/db/init.sh), however if these steps fail they can be run manually (currently a bit temperamental - TODO ISSUE - will know if successful if can see a database created that matches the provided $MB_DB_DBNAME).

Manual SQL can be executed from the Adminer DB interface, e.g. using the example config:
```
CREATE USER metabase WITH PASSWORD 'metabase';
CREATE DATABASE metabase;
GRANT ALL PRIVILEGES ON DATABASE metabase to metabase;
```

Once running complete configuration from within the dashboard app. 

Create a user account using preferred credentials and retain securely elsewhere. As a default when running test servers in docker the following credentials are used
```
email: demo@demo.com
password: demo1234
```

Configure connection to the same database created by the api:
```
Database type: PostgreSQL
Name: (any)
Host: db
Port: 5432
Database name: ($APP_DB_NAME in ../api/.env)
Username: ($APP_DB_USER in ../api/.env)
Password: ($APP_DB_PASSWORD in ../api/.env)
```


You should then see the main dashboard page

### Matomo Analytics
http://localhost/analytics/

An initial set of configuration screens should walk through the process of setting up users and a database connection. If connection fails or additional users need to be created the database can be accessed via the same Adminer `/dbadmin` path and `root` user credentials
```
System: MySQL
Server: analytics_db
Username: root
Password: (MYSQL_ROOT_PASSWORD in .env)
Database: (blank)
```
You will be asked to create a super user login and password. This information should be stored safely.
As a default when running test servers in docker the following credentials are used
```
email: demo@demo.com
password: demo1234
```

To enable data collection from the frontend application follow instructions in the dashboard. You may need to record the Matomo Url and site ID as seen on the initial page, e.g.
```
Matomo URL: http://localhost/
Your site ID: 1
```

**Handling Redirects**
An extra configuration step is required to allow matomo to be hosted from a subdirectly (e.g. `/analytics`). See instructions in [docker/config/analytics_dashboard/config.ini](./docker/config/analytics_dashboard/config.ini).
General reference notes are also available in [docker/config/nginx/conf/locations.conf](./docker/config/nginx/conf/locations.conf)

These changes can only be applied after initial setup, as it is during this process that a `config.ini` file is populated to the matomo volume and exposed to the local matomo config folder.

You should see previously broken images now appearing correctly

**Handling CORS**
If deploying to a site that is hosted on a different domain, CORS should be enabled in the analytics paltform `Settings -> System -> General settings` options.

Additionally, privacy settings on the platform might need to be visited (such as `DoNotTrack` browser defaults). More information at https://matomo.org/privacy

## N8N Automation Triggers
http://localhost/triggers/

This uses the tool [N8N](https://n8n.io/) to provide access to automation and triggers based on events.
Currently the tool only supports single user authentication provided by username and password provided in the `.env` file

```
Username: ($N8N_BASIC_AUTH_USER in .env)
Password: ($N8N_BASIC_AUTH_PASSWORD in .env)
```

Other server containers can be accessed as part of automation processes, such as the local api at `http://api:3000` or the postgres db at `http://db:5432`

Note - The url currently redirects to the exposed port on localhost as subfolder confiugration has not been possible.
See community discussion on issue (https://community.n8n.io/t/n8n-as-a-subfolder-with-nginx/7958).
Roughly the issue is:
- Enable frontend to serve from subdirectory (requires setting VUE_APP_URL_BASE_API env var before build and release as custom docker image)
- Enable backend communication (tbc - not currently working with subdirectory)
- Handle nginx proxy pass config and headers (tbc - possibly adaptable from [example traefik docker-compose.yml](https://github.com/n8n-io/n8n/tree/master/docker/compose/subfolderWithSSL) )


## Server Deployment (WiP docs)
Production deployments can be managed in the same way as local deployments,
although docker installation may vary depending on platform.

Additional care should also be taken to ensure all passwords set in the `.env` file are changed to strong variants.

### Securing automaticatlly
The docker container will automatically generate https certificates and renew for the `SERVER_NAME` specified in the `.env` file, with additional config options. I.e.

```
CERTBOT_EMAIL=myEmail@mydomain.com
SERVER_NAME=example.mydomain.com
USE_LOCAL_CA=0
```

### WiP - Alternate deployment
Another way to deploy on a standalone server is via [Swarmlet](https://swarmlet.dev/docs) - an automation service that handles installing and managing docker containers

Note - If installing via swarmlet it is also possible to omit Matomo and Nginx containers and use services provided by swarmlet instead.


