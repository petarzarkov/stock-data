import { generalErrors } from "@app/server/swagger/generalErrors";
import { FastifySchema } from "fastify";

export const categorySchema = {
  type: "object",
  required: ["id", "category", "languageId"],
  properties: {
    id: { type: "string", format: "uuid" },
    category: { type: "string" },
    previewName: { type: "string" },
    languageId: { type: "string", format: "uuid" },
  }
};

export const categoriesSchema: FastifySchema & Record<string, unknown> = {
  description: "Get categories",
  tags: ["category"],
  summary: "Categories",
  response: {
    "2xx": {
      description: "Successful response",
      type: "object",
      properties: {
        isSuccess: { type: "boolean" },
        result: {
          type: "array",
          items: categorySchema
        },
      }
    },
    ...generalErrors
  },
};