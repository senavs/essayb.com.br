# [essayB](https://essayb.com.br/)
Advanced Software Lab (LAS) essay blog project.

## Developers
* João Marcelo de Jesus Macedo (Jmarcelo98).
* Matheus Reis de Souza Teixeirense (Mat123Reis).
* Matheus Sena Vasconcelos (senavs).
* Ygor Oliveira Gonçalves (ygoliveira).

## Project Advisor
* Alexandre Mori.

## Setup (with docker)
To run essayB application, you need to have installed [docker](https://docs.docker.com/). 
Follow this [tutorial](https://docs.docker.com/engine/install/ubuntu/) to get start.
Besides, install [docker-compose](https://docs.docker.com/compose/install/) to deploy all containers easily.  

Minimal docker and docker-compose version:
```shell
docker --version
# Docker version 20.10.3

docker-compose --version
# docker-compose version 1.28.2
```

After you have installed the docker and cloned the project, run the follow command inside project folder:
```shell
docker-compose up
```

Or you can run the development project with the follow command:
```shell
docker-compose -f docker-compose.dev.yml up
```

## Setup locally (without Docker)
You can also run the application without docker installed. To do that, it's necessary to install all programs and libraries locally.

- **Frontend dependencies:**  
  First, it's necessary to install [nodejs](https://nodejs.org/en/download/).
  ```shell
  node -v
  # v14.15.5
  ```

  Then, inside essayb.com.br/frontend folder, install all dependencies.
  ```shell
  npm install
  ```
  
  If it shows any permission error, try to run the same command with root user (or with an administrator cmd for Windows).
  ```shell
  sudo npm install
  ```

- **Backend dependencies:**  
  Second, to run all backend API, it's necessary to install [Python 3.9](https://www.python.org/downloads/) (or latest) version.
  ```shell
  python3 --version
  # Python 3.9.1
  ```
  
  Then, you need to install all python dependencies. To do so, get into essayb.com.br/backend folder and run the following command.
  ```shell
  pip install -e .
  ```

- **Database:**  
  EssayB application needs a database to store its data. [PostgreSQL](https://www.postgresql.org/download/) is the most recommended.
  

- **Running:**  
  After install postgres database, nodejs, python and all the dependencies, now it's time to run the EssayB application.
  
  Setup all environments variables before run frontend and backend apps.
  ```shell
  # linux/mac
  export DATABASE_URI='postgres://username:password@local_database_ip:5432/ESSAYB_DEV'
  ```
  ```shell
  # windows
  set DATABASE_URI='postgres://username:password@local_database_ip:5432/ESSAYB_DEV'
  ```
  
  Note: remember to replace `username`, `password` and `local_database_ip` with your local database configuration.

  With it's done, now you can run the apps.
  
  To run the frontend, get into essayb.com.br/frontend folder and run the follow command:
  ```shell
  npm start
  ```
  
  To run the backend, open a new terminal and get into essayb.com.br/backend folder and run the follow command:
  ```shell
  python3 -m api
  ```

## URLs
Now you can access this URLs and test the application:  

| Local Application            	| Project URL                	|
|---------------------------	|----------------------------	|
| Frontend (with docker)    	| http://localhost:8080/     	|
| Frontend (without docker) 	| http://localhost:3000/     	|
| Backend                   	| http://localhost:8888/docs 	|

| Production Application 	| Project URL 	|
|------------------------	|-------------	|
| Frontend               	| WIP         	|
| Backend                	| WIP         	|
  
## License
Copyright (c) essayB.  
All Rights Reserved.