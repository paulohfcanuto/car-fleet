# Setup the infrastructure

## Create the database with docker

```shell
docker-compose up -d postgresql
```

## Enter the docker container

```shell
docker exec -i -t postgresql /bin/bash
```

## Login into postgresql console

```shell
psql -U root -d development
```

# How to run the app

Install all deps.

```shell
npm install
```

copy .env.example file

```shell
cp .env.example .env
```

Create tables:

```shell
npx prisma migrate dev --name init
```

seed the database:

```shell
npx prisma db seed
```

Reset seed [Optional]:

```shell
npx prisma migrate reset
```

start the app:

```shell
npm run start
```

Build a docker image [Optional]

```shell
docker build . -t paulohfcanuto/express-typescript
```

Run a docker image [Optional]

```shell
docker run -p 8080:8080 -d paulohfcanuto/express-typescript
```
