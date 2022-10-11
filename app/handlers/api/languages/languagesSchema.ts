import { generalErrors } from "@app/server/swagger/generalErrors";
import { FastifySchema } from "fastify";

export const languageSchema = {
  type: "object",
  required: ["id", "lang"],
  properties: {
    id: { type: "string", format: "uuid" },
    lang: { type: "string" },
    previewName: { type: "string" },
  }
};

export const languagesSchema: FastifySchema & Record<string, unknown> = {
  description: "Get languages",
  tags: ["language"],
  summary: "Languages",
  response: {
    "2xx": {
      description: "Successful response",
      type: "object",
      properties: {
        isSuccess: { type: "boolean" },
        result: {
          type: "array",
          items: languageSchema
        },
      }
    },
    ...generalErrors
  },
};