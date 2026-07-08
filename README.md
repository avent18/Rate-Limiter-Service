<p align="center">
  <img src="src/assets/rate-limiting-service-banner.svg" alt="Rate Limiter Banner" width="100%">
</p>

<h1 align="center"> Rate Limiter Service</h1>

<p align="center">
A production-ready distributed <b>Rate Limiter Service</b> built using <b>Node.js</b>, <b>Express.js</b>, <b>Redis</b>, <b>PostgreSQL</b>, <b>Prisma ORM</b>, <b>Docker</b>, and <b>Nginx</b>.
</p>

<p align="center">

![Node.js](https://img.shields.io/badge/Node.js-22-green?logo=node.js)
![Express](https://img.shields.io/badge/Express-5-black?logo=express)
![Redis](https://img.shields.io/badge/Redis-7-red?logo=redis)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-blue?logo=postgresql)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?logo=docker)
![Nginx](https://img.shields.io/badge/Nginx-LoadBalancer-009639?logo=nginx)

</p>


---

## 📖 Overview

Rate Limiter Service is a production-ready backend application that implements the **Token Bucket Algorithm** to efficiently control API traffic. The project is horizontally scalable using multiple Node.js instances behind an Nginx Load Balancer while maintaining a shared bucket state through Redis and persistent configuration in PostgreSQL.


## ✨ Features

### 🚀 Core Functionality

* Implements the **Token Bucket Algorithm** for efficient API rate limiting.
* Supports configurable **capacity** and **refill rate** for each client.
* Provides **Admin APIs** to create, update, retrieve, and delete client configurations.
* Maintains persistent client configurations in **PostgreSQL**.

---

### ⚡ High Performance

* Stores bucket state in **Redis** for fast read/write operations.
* Caches client configurations in Redis to minimize unnecessary database queries.
* Automatically refills tokens based on the configured refill rate.
* Designed to handle high request throughput with low latency.

---

### 📈 Scalability

* Supports **horizontal scaling** with multiple Node.js application instances.
* Uses **Nginx Round Robin Load Balancer** to distribute incoming traffic.
* Ensures consistent rate limiting across all application instances using shared Redis and PostgreSQL.

---

### 🐳 Containerization

* Fully containerized using **Docker**.
* Multi-container orchestration with **Docker Compose**.
* Automatically applies pending Prisma migrations during container startup.

---

### 🛡 Reliability

* Input validation using **Zod**.
* Structured request logging with **Pino**.
* Unique request IDs for easier debugging and tracing.
* Graceful shutdown to safely close database and Redis connections.

---

### 📖 Developer Experience

* Interactive API documentation using **Swagger UI**.
* Environment-based configuration using **.env**.
* Clean layered architecture (Controllers → Services → Repositories).
* Performance tested using **Autocannon**.
