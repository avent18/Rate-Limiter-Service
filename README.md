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
