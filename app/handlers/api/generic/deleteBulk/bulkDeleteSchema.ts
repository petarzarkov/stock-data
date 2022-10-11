import { generalErrors } from "@app/server/swagger/generalErrors";
import { FastifySchema } from "fastify";

export const bulkDeleteSchema = (type: string): FastifySchema & Record<string, unknown> => {
  return {
    description: `Bulk delete ${type} by ids`,
    tags: [type],
    summary: `Bulk delete ${type} by ids`,
    body: {
      type: "array",
      items: {
        type: "string",
      }
    },
    response: {
      "2xx": {
        description: "Successful response",
        type: "object",
        properties: {
          isSuccess: { type: "boolean" },
          result: {
            type: "number",
          },
        }
      },
      ...generalErrors
    },
    security: [
      {
        "apitoken": []
      }
    ]
  };
};