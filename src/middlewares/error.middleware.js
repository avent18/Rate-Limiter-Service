import { ApiError } from "../utils/ApiError.js";
import { Prisma } from "@prisma/client";


export const errorHandler = (err, req, res, next)=>{
  //business error
  if(err instanceof ApiError){
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }
   

  //prisma error
  if (err instanceof Prisma.PrismaClientInitializationError) {
    logger.error(
        {
            err,
            requestId: req.id
        },
        "Database connection failed"
    );

    return res.status(503).json({
        success: false,
        message: "Database temporarily unavailable"
    });
}

  //unexpected error

  logger.error({
    err, //pino erro object ko properly sanitize krta h , agar hum sirf err.message ya err.stack log krte h to ye properly sanitize nhi hota h
    method: req.method,
    url: req.originalUrl,
    statusCode: err.statusCode || 500,
    requestId: req.id,

  }, "unhandled server error");


  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
}