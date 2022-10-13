import { generalErrors } from "@app/server/swagger/generalErrors";
import { FastifySchema } from "fastify";

export const stockSchema = {
    type: "object",
    required: ["id", "typeId", "buyTime", "buyPrice", "sellTime", "sellPrice", "createdAt"],
    properties: {
        id: { type: "string", format: "uuid" },
        typeId: { type: "string", format: "uuid" },
        buyTime: { type: "string" },
        buyPrice: { type: "number" },
        sellTime: { type: "string" },
        sellPrice: { type: "number" },
        createdAt: { type: "string" },
        updatedAt: { type: "string" },
    }
};

export const stocksSchema: FastifySchema & Record<string, unknown> = {
    description: "Get all stocks",
    tags: ["stocks"],
    summary: "Get Stocks",
    querystring: {
        type: "object",
        additionalProperties: false,
        properties: {
            // amount: { type: "number", minimum: MIN_QUESTIONS, maximum: MAX_QUESTIONS },
            // languageId: { type: "number" },
            // categoryId: { type: "number" },
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