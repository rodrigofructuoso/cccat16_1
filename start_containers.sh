#!/usr/bin/env bash

. .compose-dotenv

sudo docker compose --env-file .compose-dotenv up -d --wait
sudo docker exec -it ${DB_CONTAINER_NAME} psql \
    --host=localhost \
    --username=${DB_USERNAME} \
    --dbname=${DB_NAME} \
    --command="$(cat create.sql)"
