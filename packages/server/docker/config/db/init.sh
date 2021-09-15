#!/bin/bash
# set -e

# NOTE - this file should be saved in LF format not CLRF

# Debugging - print environment variables
# printenv

# Create API user/password/table
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE USER $APP_DB_USER WITH PASSWORD '${APP_DB_PASSWORD}';
    CREATE DATABASE ${APP_DB_NAME};
    GRANT ALL PRIVILEGES ON DATABASE ${APP_DB_NAME} TO ${APP_DB_USER};
EOSQL

# Create Metabase user/password/table
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE USER ${MB_DB_USER} WITH PASSWORD '${MB_DB_PASS}';
    CREATE DATABASE ${MB_DB_DBNAME};
    GRANT ALL PRIVILEGES ON DATABASE ${MB_DB_DBNAME} TO ${MB_DB_USER};
EOSQL


