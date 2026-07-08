/** @format */

import express from "express";
import {
  createClientController,
  getClientController,
  updateClientController,
  deleteClientController,
  getAllClientController
} from "../controllers/admin.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createClientSchema, updateClientSchema  } from "../validators/client.validator.js";


const router = express.Router();

/**
 * @swagger
 * /admin/client:
 *   post:
 *     tags:
 *       - Admin
 *     summary: Create a new client
 *     description: Creates a new client configuration for rate limiting.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClientConfig'
 *     responses:
 *       201:
 *         description: Client created successfully
 *         content:
 *            application/json:
 *            schema:
 *              $ref: '#/components/schemas/ClientResponse'
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Client already exists
 *         content:
 *           application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/client", validate(createClientSchema), createClientController);

/**
 * @swagger
 * /admin/client/{clientId}:
 *   get:
 *     tags:
 *       - Admin
 *     summary: get client by clientId
 *     description: Retrieves a existing client configuration for rate limiting.
 *     parameters:
 *       - in: path
 *         name: clientId
 *         required: true
 *         description: Unique Identifier for client
 *         schema:
 *           type: string
 *           example: google
 *     responses:
 *       200:
 *         description: Client fetched successfully
 *         content:
 *            application/json:
 *            schema:
 *              $ref: '#/components/schemas/ClientResponse'
 *       404:
 *         description: client not found
 *         content:
 *           application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/client/:clientId", getClientController);

/**
 * @swagger
 * /admin/client/{clientId}:
 *   put:
 *     tags:
 *       - Admin
 *     summary: update client by clientId
 *     description: Updates a existing client configuration for rate limiting.
 *     parameters:
 *       - in: path
 *         name: clientId
 *         required: true
 *         description: Unique Identifier for client
 *         schema:
 *           type: string
 *           example: google
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateClientConfig'
 *     responses:
 *       200:
 *         description: Client updated successfully
 *         content:
 *            application/json:
 *            schema:
 *              $ref: '#/components/schemas/ClientResponse'
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Client not found
 *         content:
 *           application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 */
router.put(
  "/client/:clientId",
  validate(updateClientSchema),
  updateClientController,
);

/**
 * @swagger
 * /admin/client/{clientId}:
 *   delete:
 *     tags:
 *       - Admin
 *     summary: Delete a client
 *     description: Deletes an existing client configuration and removes its associated Redis bucket.
 *     parameters:
 *       - in: path
 *         name: clientId
 *         required: true
 *         description: Unique identifier of the client
 *         schema:
 *           type: string
 *           example: google
 *     responses:
 *       200:
 *         description: Client deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClientResponse'
 *       404:
 *         description: Client not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete(
  "/client/:clientId",
  deleteClientController
);


/**
 * @swagger
 * /admin/clients:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get all clients
 *     description: Retrieves a paginated list of all client configurations.
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         description: Page number (default is 1)
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Number of clients per page (default is 10, maximum is 100)
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Clients fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClientListResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/clients", getAllClientController);

export default router;
