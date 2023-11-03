# Store

## Clonar el repositorio

`git clone git@github.com:diani7/test.git`

## Variables de entorno

`cp .env.example .env`

```
# .env 

APP_PORT=5000
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=store-db
DB_USER=root
DB_PASS=example

```

## Docker compose para instancia de mariadb

```
#docker-compose.yml

version: '3.1'

services:

  db:
    image: mariadb
    restart: always
    ports:
      - 3306:3306
    environment:
      MARIADB_ROOT_PASSWORD: example

```

## Usar Node 18 LTS con nvm

`nvm use`

## Instalar paquetes 

`npm install`

## Migración ORM sequelize 

``