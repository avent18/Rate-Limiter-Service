import express from 'express';
import adminRoutes from './routes/admin.route.js';
import errorHandler from './middlewares/errorHandler.js';
import checkRouter from './routes/rateLimiter.routes.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';
import { requestLogger } from "./middlewares/requestLogger.middleware.js";
import healthRouter from './routes/healthCheck.route.js';


const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));//converts swaggerspect to html ui

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("X-Served-By", process.env.INSTANCE_NAME || "unknown");
  next();
});

app.use(requestLogger);



app.use("/admin", adminRoutes);
app.use("/rate-limiter", checkRouter);
app.use("/", healthRouter)

app.use(errorHandler);

export default app;