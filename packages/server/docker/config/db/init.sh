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


# Manually used snippet to create user with readonly access on plh database

# -- https://tableplus.com/blog/2018/04/postgresql-how-to-create-read-only-user.html
# CREATE USER ${APP_DB_READONLY_USER} WITH PASSWORD '${APP_DB_READONLY_USER_PASS}';
# GRANT CONNECT ON DATABASE ${APP_DB_NAME} TO ${APP_DB_READONLY_USER};
# GRANT USAGE ON SCHEMA public TO ${APP_DB_READONLY_USER};
# GRANT SELECT ON ALL TABLES IN SCHEMA public TO ${APP_DB_READONLY_USER};
# --  grant access to the new table in the future automatically
# ALTER DEFAULT PRIVILEGES IN SCHEMA public
# GRANT SELECT ON TABLES TO ${APP_DB_READONLY_USER};