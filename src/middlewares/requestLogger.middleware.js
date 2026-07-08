import logger from "../config/logger.js";
import crypto from "crypto";

export const requestLogger = (req, res, next) => {
  req.id = res.get("x-request-id") || crypto.randomUUID();
  res.setHeader("x-request-id", req.id);
  req.logger = logger.child({requestId:req.id});
  const start = Date.now();
  req.logger.info({
    method: req.method,
    url: req.originalUrl,
    userAgent: req.get("User-Agent"),
    ip: req.ip,
    body: req.body,
  }, "Incoming Request");

  

  

  res.on("finish",()=>{
    const duration = Date.now() - start;
    req.logger.info({
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      contentLength: res.getHeader("content-length")
    }, "Request Completed");
  })

  next();

};