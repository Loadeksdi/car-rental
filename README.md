# Car Rental project

## Introduction
This project is a simple car rental system, developed in Node with TypeScript following:
- Domain-Centric Architecture
- REST API Design
- Dependency Injection
- Microservices Architecture and decoupled services
- Containerization with Docker for improved portability and scalability

It consists of 5 services:
- Booking: responsible for booking a car
- Catalog: responsible for managing cars
- Cart: responsible for managing users bookings
- Offer: responsible for managing rental offers
- User: responsible for Identity and Access Management

## Getting Started
To run the project, (considering you have Docker Compose installed and Docker running on your machine, if not: https://docs.docker.com/compose/install) the only thing you have to do is to go at the root of the project and then run the following command:
```
docker-compose build && docker-compose up
```
We also recommend using pnpm instead of npm or yarn to build the project, to install it, run the following command:
```
npm install -g pnpm
```
It will deploy the 5 services on your localhost from ports 3000 to 3004 and also port 5432 for the PostgreSQL database to run properly, and you can then play with the API using Postman by importing the configuration file **car-rental.postman_collection.json** located at the root of the project.

## Features that could be implemented
- Use a message broker to decouple the services even more (Kafka, RabbitMQ, etc.)
- Use a load balancer and pods to scale the services when needed (Kubernetes, Docker Swarm, etc.)
- Use a real in-memory database for cart service (Redis, Memcached etc.)
- Use a monitoring tool (Prometheus, Grafana, etc.) and a logging tool (ELK, etc.)
