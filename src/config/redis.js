import Redis from 'ioredis'
import logger from "./logger.js";

const redis = new Redis(process.env.REDIS_URL);

redis.on('connect',()=>{
  logger.info("Redis connected");
})

redis.on('ready', ()=>{
  logger.info("Redis ready");
})

redis.on('error', (err)=>{
  logger.error({ err }, "Redis connection error");
})

export default redis;