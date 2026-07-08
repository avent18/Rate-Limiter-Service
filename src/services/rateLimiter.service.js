
import { getClientByClientId } from "../repository/client.repository.js";
import ApiError from "../utils/ApiError.js";
import { refillBucket } from "../utils/tokensBucket.js";
import { getClientConfig, setClientConfig } from "../repository/redis.repository.js";

import {
  getBucket,
  createBucket,
  updateBucket,
  deleteBucket,
} from "../repository/bucket.redis.repository.js";

export const checkRateLimit = async (clientId, logger) => {
  let existingClient = await getClientConfig(clientId);

  if (!existingClient) {
    existingClient = await getClientByClientId(clientId);

    if (!existingClient) {
      logger.warn(
        { clientId },
        "Client not found"
      );

      throw new ApiError(404, "Client not found");
    }

    await setClientConfig(clientId, {
  clientId: existingClient.clientId,
  capacity: existingClient.capacity,
  refillRate: existingClient.refillRate,
  algorithm: existingClient.algorithm,
});

    logger.info(
      { clientId },
      "Client configuration cached"
    );
  }

  let bucket = await getBucket(existingClient.clientId);

  if (!bucket) {
    bucket = await createBucket(existingClient.clientId, {
      tokens: existingClient.capacity,
      lastRefill: new Date(),
    });

    logger.info(
      {
        clientId: existingClient.clientId,
      },
      "Bucket created successfully"
    );
  }

  const refilled = refillBucket(bucket, existingClient);

  if (refilled.success) {
    logger.info(
      {
        clientId: existingClient.clientId,
        tokens: bucket.tokens,
      },
      "Bucket refilled successfully"
    );
  }

  if (bucket.tokens <= 0) {
    logger.warn(
      {
        clientId: existingClient.clientId,
        remainingTokens: bucket.tokens,
      },
      "Rate limit exceeded"
    );

    throw new ApiError(429, "Rate limit exceeded");
  }

  bucket.tokens--;

  await updateBucket(existingClient.clientId, {
    tokens: bucket.tokens,
    lastRefill: bucket.lastRefill,
  });

  return {
    allowed: true,
    message: "Request successful",
    remainingTokens: bucket.tokens,
  };
};
