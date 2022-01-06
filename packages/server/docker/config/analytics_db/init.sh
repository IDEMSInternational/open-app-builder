#!/bin/bash
set -e

# https://raw.githubusercontent.com/saadismail/useful-bash-scripts/master/db.sh
# https://www.virtual-dba.com/blog/mysql/mysql-user-wildcard-and-localhost-hosts/
# TODO - restrict IPs for connection
echo "Creating Matomo DB"
mysql --user=root --password=${MYSQL_ROOT_PASSWORD} -e "CREATE DATABASE ${MATOMO_DATABASE_DBNAME} /*\!40100 DEFAULT CHARACTER SET utf8 */;"
mysql --user=root --password=${MYSQL_ROOT_PASSWORD} -e "CREATE USER '${MATOMO_DATABASE_USERNAME}'@'%' IDENTIFIED BY '${MATOMO_DATABASE_PASSWORD}';"
# also allow access from non-localhost (e.g. docker internal)
mysql --user=root --password=${MYSQL_ROOT_PASSWORD} -e "GRANT ALL PRIVILEGES ON ${MATOMO_DATABASE_DBNAME}.* TO '${MATOMO_DATABASE_USERNAME}'@'%';"
mysql --user=root --password=${MYSQL_ROOT_PASSWORD} -e "FLUSH PRIVILEGES;"
exit