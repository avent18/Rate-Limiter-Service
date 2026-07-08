/** @format */

import {
  createClientService,
  deleteClientService,
  getAllClientService,
} from "../services/admin.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import { getClientService } from "../services/admin.service.js";
import { updateClientService } from "../services/admin.service.js";
import { success } from "zod";

export const createClientController = asyncHandler(async (req, res) => {
  const data = req.body;
  const client = await createClientService(data, req.logger);

  return res.status(201).json({
    success: true,
    message: "Client created successfully",
    client,
  });
});

export const getClientController = asyncHandler(async (req, res) => {
  const clientId = req.params.clientId;
  const client = await getClientService(clientId);
  return res.status(200).json({
    success: true,
    client,
  });
});

export const updateClientController = asyncHandler(async (req, res) => {
  const clientId = req.params.clientId;
  const data = req.body;
  const updatedClient = await updateClientService(clientId, data);
  return res.status(200).json({
    success: true,
    message: "Client updated successfully",
    updatedClient,
  });
});

export const deleteClientController = asyncHandler(async (req, res) => {
  const deletedClient = await deleteClientService(req.body.params, req.logger);
  return res.status(200).json({
    success: true,
    message: "Client deleted successfully",
    client: deletedClient,
  });
});

export const getAllClientController = asyncHandler(async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(Math.max(1, Number(req.query.limit) || 10), 100); //negative n de paaye

  const result = await getAllClientService(page, limit);
  return res.status(200).json({
    success: true,
    message:"clients fetched successfully",
    data:result
  });
});
