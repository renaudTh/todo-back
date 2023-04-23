# Todo-back

![Workflow informations](https://github.com/renaudTh/todo-back/actions/workflows/main.yml/badge.svg)

This project is a very simple todo-app backend using nestjs and postgres.
I use this to learn nest, but also Docker, docker compose and github actions to set up a real worflow on a very small poject. 

## Run : a first option

To run this project you have two options, assuming you use npm. 
- First clone this repo.
- Create a .env file containing your postgres informations. 
- Run your postgres db
- Run these lines

```shell
cd todo-back
npm install
npm run start:dev
```

You should be able to CRUD the todos using postman or any request software.

## Run : the second option

You can use the Dockerfile and docker-compose.yml provided to run both the server and postgres service in one container. 

- Clone this repo
- Create a .env file containing your postgres informations. 
- Create a Docker.env with postgres informations
- Run `docker compose up` which launch the server and postgres.

You can CRUD the todos.