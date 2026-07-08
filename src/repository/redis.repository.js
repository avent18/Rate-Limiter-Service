import redis from "../config/redis.js";

const getClientConfigKey = (clientId) =>
  `client-config:${clientId}`;

export const getClientConfig = async (clientId) => {
  const value = await redis.get(getClientConfigKey(clientId));

  if (!value) return null;

  return JSON.parse(value);
};

export const setClientConfig = async (clientId, config) => {
  await redis.set(
    getClientConfigKey(clientId),
    JSON.stringify(config),
    "EX",
    300
  );

  return config;
};

export const deleteClientConfig = async (clientId) => {
  return redis.del(getClientConfigKey(clientId));
};