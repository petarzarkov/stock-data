import { generalErrors } from "@app/server/swagger/generalErrors";
import { FastifySchema } from "fastify";

export const stockSchema = {
    type: "object",
    required: ["id", "typeId", "buyTime", "buyPrice", "sellTime", "sellPrice", "createdAt"],
    properties: {
        id: { type: "string", format: "uuid" },
        typeId: { type: "string", format: "uuid" },
        buyTime: { type: "string", format: "date" },
        buyPrice: { type: "number" },
        sellTime: { type: "string", format: "date" },
        sellPrice: { type: "number" },
        createdAt: { type: "string", format: "date" },
        updatedAt: { type: "string", format: "date" },
    }
};

export const stocksSchema: FastifySchema & Record<string, unknown> = {
    description: "Get all stocks, from-to",
    tags: ["stocks"],
    summary: "Get Stocks",
    querystring: {
        type: "object",
        additionalProperties: false,
        properties: {
            from: { type: "string", format: "date" },
            to: { type: "string", format: "date" },
        }
    },
    response: {
        "2xx": {
            description: "Successful response",
            type: "object",
            properties: {
                isOk: { type: "boolean" },
                result: {
                    type: "array",
                    nullable: true,
                    items: stockSchema
                },
            }
        },
        ...generalErrors
    }
};