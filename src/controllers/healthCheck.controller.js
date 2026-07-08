import prisma from "../config/prisma.js";
import redis from "../config/redis.js";
import logger from "../config/logger.js";

export const healthCheckController = async (req, res) => {
  let databaseStatus = "DOWN";
  let redisStatus = "DOWN";

  try {
    // Check PostgreSQL
    await prisma.$queryRaw`SELECT 1`;
    databaseStatus = "UP";

    // Check Redis
    const redisPing = await redis.ping();
    if (redisPing === "PONG") {
      redisStatus = "UP";
    }

    return res.status(200).json({
      success: true,
      status: "UP",
      services: {
        database: databaseStatus,
        redis: redisStatus,
      },
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error(
      {
        err: error,
        database: databaseStatus,
        redis: redisStatus,
      },
      "Health check failed"
    );

    return res.status(503).json({
      success: false,
      status: "DOWN",
      services: {
        database: databaseStatus,
        redis: redisStatus,
      },
      message: "One or more services are unavailable",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  }
};