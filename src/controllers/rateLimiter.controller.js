import asyncHandler from "../utils/asyncHandler.js";
import { checkRateLimit } from "../services/rateLimiter.service.js";

export const checkRateLimitController = asyncHandler(async (req, res) => {
  const  result = await checkRateLimit(req.body.clientId, req.logger);

  return res.status(200).json({
    success: true,
    message: "Rate limit check successful",
    result,
  });
})