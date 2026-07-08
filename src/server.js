

import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import prisma from "./config/prisma.js";
import redis from "./config/redis.js";
import logger from "../src/config/logger.js";

const PORT = process.env.PORT || 3000;

let server;

const startServer = async () => {
  const MAX_RETRIES = 10;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      await prisma.$connect();
      logger.info("Database Connected");

      server = app.listen(PORT, () => {
        logger.info(`Server running on ${PORT}`);
      });

      return;
    } catch (err) {
      logger.warn(
        `Database not ready. Retry ${attempt}/${MAX_RETRIES}...`
      );

      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }

  logger.error("Failed to connect to database.");
  process.exit(1);
};

const gracefullShutDown = async(signal)=>{
 logger.info(`${signal} received, sever shutting down gracefully`);

 server.close(async()=>{
  try {
    await prisma.$disconnect();
  logger.info(`prisma disconnected`);

  await redis.quit();
  logger.info(`redis discononected`);


  logger.info("Server closed successfully");
  process.exit(0);

  } catch (error) {
    logger.error({err:error}, "Gracefull shutdown failed")
    process.exit(1);
  }
 })
}

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));


startServer();