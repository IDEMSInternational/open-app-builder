#!/bin/bash
set -e

# Create Metabase table
# TODO - use env vars for pw
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER metabase WITH PASSWORD 'metabase';
    CREATE DATABASE metabase;
    GRANT ALL PRIVILEGES ON DATABASE metabase TO metabase;
EOSQL