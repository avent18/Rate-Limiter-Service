
import swaggerJsdoc from "swagger-jsdoc";
import { success } from "zod";
import { minimum } from "zod/mini";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Rate Limiter Service API",
      version: "1.0.0",
      description:
        "REST API for configurable rate limiting using Token Bucket algorithm.",
      contact: {
        name: "Naveen kumar",
        email: "naveenkumarnghspn@gmail.com",
      },
    },
    tags: [
  {
    name: "Admin",
    description: "Client configuration management APIs"
  },
  {
    name: "Rate Limiter",
    description: "Rate limiting operations"
  }
],
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: "Development server",
      },
      // {  for production server, you can uncomment and set the appropriate URL
      //   url:"https://rate-limiter-service.onrender.com",
      //   description:"Production server"
      // }
    ],
    components: {
      schemas: {
        //reusable schemas for request and response bodies can be defined here
        ClientConfig: {
          type: "object",
          properties: {
            clientId: {
              type: "string",
              maxLength: 50,
              minLength: 3,
              pattern: "^[a-zA-Z0-9_-]+$",
              description: "Unique identifier for the client",
              example: "google-api",
            },
            capacity: {
              type: "integer",
              minimum: 1,
              maximum: 1000,
              description:
                "Maximum number of requests allowed within the time window",
              example: 100,
            },
            refillRate: {
              type: "integer",
              minimum: 1,
              maximum: 100,
              description: "Number of tokens added to the bucket per time unit",
              example: 10,
            },
            algorithm: {
              type: "string",
              description: "Rate limiting algorithm to use",
              enum: ["TOKEN_BUCKET", "SLIDING_WINDOW"],
              example: "TOKEN_BUCKET",
            },
          },
          required: ["clientId", "capacity", "refillRate", "algorithm"],
        },
        ClientResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            message: {
              type: "String",
              example: "Client created successfully",
            },
            client: {
              $ref: "#/components/schemas/ClientConfig",
            },
          },
          required: ["success", "message", "client"],
        },
        ErrorResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            message: {
              type: "String",
              example: "Client already exists",
            },
            errors: {
              type: "object",
              nullable: true,
            },
          },
          required: ["success", "message"],
        },
        UpdateClientConfig: {
          type: "object",
          properties: {
            capacity: {
              type: "integer",
              description: "Maximum number of tokens in the bucket",
              example: 20,
              minimum: 1,
            },
            refillRate: {
              type: "integer",
              description: "Number of tokens added per second",
              example: 5,
              minimum: 1,
            },
            algorithm: {
              type: "string",
              description: "Rate limiting algorithm",
              enum: ["TOKEN_BUCKET", "SLIDING_WINDOW"],
              example: "TOKEN_BUCKET",
            },
          },
        },
        ClientListResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            message: {
              type: "string",
              example: "Clients fetched successfully",
            },
            data: {
              type: "object",
              properties: {
                clients: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/ClientConfig",
                  },
                },
                pagination: {
                  type: "object",
                  properties: {
                    page: {
                      type: "integer",
                      example: 1,
                    },
                    limit: {
                      type: "integer",
                      example: 10,
                    },
                    total: {
                      type: "integer",
                      example: 25,
                    },
                    totalPages: {
                      type: "integer",
                      example: 3,
                    },
                  },
                },
              },
            },
          },
        },

        //for rate-limit-api req-res schema
        RateLimitRequest: {
          type: "object",
          properties: {
            clientId: {
              type: "string",
              example: "google",
            },
          },
          required: ["clientId"],
        },

        RateLimitResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            message: {
              type: "string",
              example: "Rate limit check successful",
            },
            result: {
              type: "object",
              properties: {
                allowed: {
                  type: "boolean",
                  example: true,
                },
                message: {
                  type: "string",
                  example: "Request successful",
                },
                remainingTokens: {
                  type: "integer",
                  example: 49,
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/**/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
