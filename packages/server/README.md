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

Similarly, the api package should have corresponding environment variables set
```bash
cp ../api/.env.sample ../api/.env
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


## Server Deployment (WiP docs)
To deploy on a server the same ensure docker and docker-compse are installed and run the same way as locally

### Securing with HTTPS
The recommended approach is to use [Certbot](https://certbot.eff.org/). An example of creating certificates whilst running a docker nginx container can be found here: https://dbillinghamuk.medium.com/certbot-certificate-verification-through-nginx-container-710c299ec549

TODO - in future this could be handled with nginx-certbot image all similar docker container system


### WiP - Alternate deployment
Another way to deploy on a standalone server is via [Swarmlet](https://swarmlet.dev/docs) - an automation service that handles installing and managing docker containers

Note - If installing via swarmlet it is also possible to omit Matomo and Nginx containers and use services provided by swarmlet instead.


