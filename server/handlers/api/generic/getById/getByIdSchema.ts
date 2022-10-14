import { getItemSchemaPerType } from "@server/handlers";
import { generalErrors } from "@server/server/swagger/generalErrors";
import { FastifySchema } from "fastify";

export const getByIdSchema = (type: string): FastifySchema & Record<string, unknown> => ({
    description: `Get ${type} by id`,
    tags: [type],
    summary: `Get ${type} by id`,
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
                isOk: { type: "boolean" },
                result: getItemSchemaPerType(type),
            }
        },
        ...generalErrors
    }
});