import { generalErrors } from "@app/server/swagger/generalErrors";
import { FastifySchema } from "fastify";

export const stockTypeSchema = {
    type: "object",
    tags: ["stock/type"],
    required: ["id", "type"],
    properties: {
        id: { type: "string", format: "uuid" },
        type: { type: "string" }
    }
};

export const stockTypesSchema: FastifySchema & Record<string, unknown> = {
    description: "Get stock types",
    tags: ["stock/types"],
    summary: "Stock Types",
    response: {
        "2xx": {
            description: "Successful response",
            type: "object",
            properties: {
                isOk: { type: "boolean" },
                result: {
                    type: "array",
                    items: stockTypeSchema
                },
            }
        },
        ...generalErrors
    },
};