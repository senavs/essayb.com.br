# [essayB](https://essayb.com.br/)
Advanced Software Lab (LAS) essay blog project.

## Developers
* João Marcelo de Jesus Macedo (Jmarcelo98).
* Matheus Reis de Souza Teixeirense (Mat123Reis).
* Matheus Sena Vasconcelos (senavs).
* Ygor Oliveira Gonçalves (ygoliveira).

## Project Advisor
* Alexandre Mori.

## Setup
To run essayB application, you need to have installed [docker](https://docs.docker.com/). 
Follow this [tutorial](https://docs.docker.com/engine/install/ubuntu/) to get start.
Besides that, install [docker-compose](https://docs.docker.com/compose/install/) to deploy all containers easily.  

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

## License
Copyright (c) essayB. All Rights Reserved.