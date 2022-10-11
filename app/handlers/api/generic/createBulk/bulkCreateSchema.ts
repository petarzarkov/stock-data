import { getItemSchemaPerType } from "@app/handlers";
import { generalErrors } from "@app/server/swagger/generalErrors";
import { FastifySchema } from "fastify";

export const bulkCreateSchema = (type: string): FastifySchema & Record<string, unknown> => {
  const schema = getItemSchemaPerType(type);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, ...rest } = schema?.properties || {};
  const [, ...required] = schema?.required || [];

  return {
    description: `Bulk create/edit ${type}`,
    tags: [type],
    summary: `Bulk create/edit ${type}`,
    body: {
      type: "array",
      items: {
        type: schema?.type,
        required,
        properties: rest
      }
    },
    response: {
      "2xx": {
        description: "Successful response",
        type: "object",
        properties: {
          isSuccess: { type: "boolean" },
          result: {
            type: "array",
            items: schema
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