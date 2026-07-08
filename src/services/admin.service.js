
import {
  getClientByClientId,
  createClient,
  deleteClientByClientId,
  getAllClients,
  countAllClients,
} from "../repository/client.repository.js";
import ApiError from "../utils/ApiError.js";
import {
  getBucketByClientConfigId,
  resetBucket,
} from "../repository/bucket.repository.js";
import { updateClientByClientId } from "../repository/client.repository.js";
import { deleteBucket } from "../repository/bucket.redis.repository.js";

export const createClientService = async (data, logger) => {
  const existingClient = await getClientByClientId(data.clientId);
  if (existingClient) {
    logger.warn(
      {
        clientId: data.clientId,
      },
      "Client already exists",
    );
    throw new ApiError(409, "Client already exists");
  }
  const client = await createClient(data);
  logger.info(
    {
      clientId: data.clientId,
      capacity: data.capacity,
      refillRate: data.refillRate,
      algorithm: client.algorithm,
    },
    "Client created successfully",
  );
  return client;
};

export const getClientService = async (clientId) => {
  const existingClient = await getClientByClientId(clientId);
  if (!existingClient) {
    throw new ApiError(404, "Client not found");
  }
  return existingClient;
};

export const updateClientService = async (clientId, data) => {
  const existingClient = await getClientByClientId(clientId);
  if (!existingClient) {
    throw new ApiError(404, "Client not found");
  }
  const updatedClient = await updateClientByClientId(clientId, data);

  const bucket = await getBucketByClientConfigId(existingClient.id);
  if (bucket) {
    await resetBucket(existingClient.id, {
      tokens: updatedClient.capacity,
      lastRefill: new Date(),
    });
  }
  return updatedClient;
};


export const deleteClientService = async (clientId, logger) => {
  const existingClient = await getClientByClientId(clientId);
  if (!existingClient) {
    logger.warn(
      {
        clientId: existingClient.clientId,
      },
      "Client not found",
    );
    throw new ApiError(404, "Client not found");
  }

  await deleteBucket(clientId);

  const deletedClient = await deleteClientByClientId(clientId);

  logger.info(
  {
    clientId: existingClient.clientId,
  },
  "Client deleted successfully"
);
  return deletedClient;
};


export const getAllClientService = async(page, limit)=>{
  const skip = (page-1)*limit; //ex- pageNumber 1 , skip 0|| pageNumber 2 , skip 10 start from 11
  const [clients, total] = await Promise.all([  //dono queries ko parallel chalayega, as they are independent
    getAllClients(skip, limit),
    countAllClients()//gives the total clients available not the total pages
  ])

  const totalPages = Math.ceil(total/limit);
  return {
    clients,
    pagination:{
      page,
      limit,
      total,
      totalPages
    }
  }
}