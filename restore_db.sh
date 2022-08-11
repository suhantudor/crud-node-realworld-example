#!/bin/sh

# Author: Tudor Suhan
# Copyright (c)

MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE_CONTAINER=mysql
MYSQL_DATABASE_BACKUP=db_mysql.sql

docker exec -i $MYSQL_DATABASE_CONTAINER sh -c 'exec mysql -uroot -p"$MYSQL_ROOT_PASSWORD"' < backup/$MYSQL_DATABASE_BACKUP

echo "RESTORE $MYSQL_DATABASE_BACKUP"
