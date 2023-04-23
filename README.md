# Todo-back

![Workflow informations](https://github.com/renaudTh/todo-back/actions/workflows/main.yml/badge.svg)

This project is a very simple todo-app backend using nestjs and postgres.
I use this to learn nest, but also Docker, docker compose and github actions to set up a real worflow on a very small poject. 

## Run
First clone this repo :
```sh
git clone git@github.com:renaudTh/todo-back.git
```
Then create a .env file containing your postgres informations such as :

```
POSTGRES_HOST= <YOUR PG HOST>
POSTGRES_PORT= <YOUR PG PORT>
POSTGRES_USER= <YOUR PG USER>
POSTGRES_PASSWORD= <YOUR PG PASSWORD>
POSTGRES_DB= <YOUR PG DB>
PORT= <PORT>
```

### Without Docker

- Run your postgres db
- Run these lines

```shell
cd todo-back
npm install
npm run start:dev
```

You should be able to CRUD the todos using postman or any request software.

### Using Docker

You can use the Dockerfile and docker-compose.yml provided to run both the server and postgres service in one container. First, be sure that [Docker](https://docs.docker.com/engine/install/ubuntu/) is installed on your machine. 


- Create a `docker.env` file with postgres informations
```
POSTGRES_USER= <YOUR PG USER>
POSTGRES_PASSWORD= <YOUR PG PASSWORD>
POSTGRES_DB= <YOUR PG DB>
```

**Warning**
In your `.env` file, be sure that `POSTGRES HOST` is setted to the postgres container defined in `docker-compose.yml`.

- Run `docker compose up` which launch the server and postgres.

You can CRUD the todos.