

export const refillBucket = (bucket, client) => {
  const now = new Date();

  const elapsedTime = now - bucket.lastRefill;
  const elapsedSeconds = elapsedTime / 1000;

  const tokensToAdd = Math.floor(
    elapsedSeconds * client.refillRate
  );

  // No refill required
  if (tokensToAdd <= 0) {
    return {
      success: false,
      tokensAdded: 0,
    };
  }

  const previousTokens = bucket.tokens;

  bucket.tokens = Math.min(
    bucket.tokens + tokensToAdd,
    client.capacity
  );

  const actualTokensAdded = bucket.tokens - previousTokens;

  if (actualTokensAdded > 0) {
    bucket.lastRefill = now;
  }

  console.log({
  lastRefill: bucket.lastRefill,
  lastRefillType: typeof bucket.lastRefill,
  elapsedTime,
  elapsedSeconds,
  tokensToAdd,
});

  return {
    success: actualTokensAdded > 0,
    tokensAdded: actualTokensAdded,
  };
};
