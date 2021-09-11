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
cp .env.example .env
```
Default values in [.env](./.env) should be changed when running in production

Similarly, the api package should have corresponding environment variables set
```bash
cp ../api/.env.example ../api/.env
```

Matomo analytics can be configured in the file [./docker/config/matomo_config/config.ini.php](./docker/config/matomo_config/config.ini.php).
Note - this file will only be populated after initial config has been completed from within the webbrowser running the app

## Running Locally
1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop   )

2. Use the start script
```bash
# From server directory
npm run start

# From parent directory
yarn workspace server start
```

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
You should already see app and metabase databases created via the initialisation script [docker/config/init.sh](./docker/config/db/init.sh)

Note - as these scripts only ever run on first initialisation, if adjustments need to be made then SQL can be executed from within Adminer in a similar way as the scripts

### Api
http://localhost/api/

The api page should load with an overview of all available endpoints for reference and testing. No additional configuration is required, however you could test populating a new app user via the `/app_users/` POST interface.

### Metabase DB Dashboard
http://localhost/dashboard/

A new database will need to be created to allow access for metabase. This should be automatically configured in [](./docker/config/db/init.sh), however if these steps fail they can be run manually (currently a bit temperamental - TODO ISSUE - will know if successful if can see a database created that matches the provided $MB_DB_DBNAME).

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
Database name: ($DB_NAME in ../api/.env)
Username: ($DB_USER in ../api/.env)
Password: ($DB_PASSWORD in ../api/.env)
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

## Server Deployment (WiP docs)
To deploy on a server the same ensure docker and docker-compse are installed and run the same way as locally

### Securing with HTTPS
The recommended approach is to use [Certbot](https://certbot.eff.org/). An example of creating certificates whilst running a docker nginx container can be found here: https://dbillinghamuk.medium.com/certbot-certificate-verification-through-nginx-container-710c299ec549

TODO - in future this could be handled with nginx-certbot image all similar docker container system


### WiP - Alternate deployment
Another way to deploy on a standalone server is via [Swarmlet](https://swarmlet.dev/docs) - an automation service that handles installing and managing docker containers

Note - If installing via swarmlet it is also possible to omit Matomo and Nginx containers and use services provided by swarmlet instead.


