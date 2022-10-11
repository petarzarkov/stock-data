import { generalErrors } from "@app/server/swagger/generalErrors";
import { FastifySchema } from "fastify";

export const delByIdSchema = (type: string): FastifySchema & Record<string, unknown> => ({
  description: `Delete ${type} by id`,
  tags: [type],
  summary: `Delete ${type} by id`,
  params: {
    type: "object",
    additionalProperties: false,
    required: ["id"],
    properties: {
      id: { type: "string", format: "uuid" }
    }
  },
  response: {
    "2xx": {
      description: "Successful response",
      type: "object",
      properties: {
        isSuccess: { type: "boolean" },
        result: { type: "number" },
      }
    },
    ...generalErrors
  },
  security: [
    {
      "apitoken": []
    }
  ]
});