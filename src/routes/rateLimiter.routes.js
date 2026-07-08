import express from 'express';
import { checkRateLimitController } from '../controllers/rateLimiter.controller.js';


const checkRouter = express.Router();


/**
 * @swagger
 * /rate-limiter/check:
 *   post:
 *     tags:
 *       - Rate Limiter
 *     summary: Check rate limit
 *     description: Checks whether a client is allowed to make a request based on the configured rate limiting algorithm.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RateLimitRequest'
 *     responses:
 *       200:
 *         description: Rate limit checked successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RateLimitResponse'
 *       404:
 *         description: Client not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       429:
 *         description: Rate limit exceeded
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
checkRouter.post('/check' , checkRateLimitController);

export default checkRouter;

