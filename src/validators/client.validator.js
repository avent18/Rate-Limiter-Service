//file for schemas
import { z } from "zod";

export const createClientSchema = z.object({
  clientId: z.string().min(3, "at least 3 characters long").max(50, "at most 50 characters long").regex(/^[a-zA-Z0-9_-]+$/, "only alphanumeric characters, underscores, and hyphens are allowed"),
  capacity: z.number().int().positive().max(process.env.MAX_CAPACITY, "at most 1000 tokens"),
  refillRate: z.number().int().positive().max(process.env.MAX_REFILL_RATE, "at most 100 tokens per second"),
  algorithm: z.enum(["TOKEN_BUCKET", "SLIDING_WINDOW"]),
}).strict();


export const updateClientSchema = z.object({
  capacity: z.number().int().positive().max(process.env.MAX_CAPACITY, "at most 1000 tokens").optional(),
  refillRate: z.number().int().positive().max(process.env.MAX_REFILL_RATE, "at most 100 tokens per second").optional(),
  algorithm: z.enum(["TOKEN_BUCKET", "SLIDING_WINDOW"]).optional(),
}).strict();