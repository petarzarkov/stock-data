import { STOCKS_FROM, STOCKS_TO } from "@app/constants";
import { generalErrors } from "@app/server/swagger/generalErrors";
import { FastifySchema } from "fastify";

export const stockSchema = {
    type: "object",
    required: ["id", "typeId", "buyTime", "buyPrice", "sellTime", "sellPrice"],
    properties: {
        id: { type: "string", format: "uuid" },
        typeId: { type: "string", format: "uuid" },
        buyTime: { type: "number", minimum: STOCKS_FROM },
        buyPrice: { type: "number" },
        sellTime: { type: "number", maximum: STOCKS_TO  },
        sellPrice: { type: "number"}
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
            from: { type: "number", minimum: STOCKS_FROM },
            to: { type: "number", maximum: STOCKS_TO }
        }
    },
    response: {
        "2xx": {
            description: "Successful response",
            type: "object",
            properties: {
                isOk: { type: "boolean" },
                result: {
                    type: "object",
                    properties: {
                        from: { type: "number", minimum: STOCKS_FROM },
                        to: { type: "number", maximum: STOCKS_TO },
                        profit: { type: "number" },
                    }
                },
            }
        },
        ...generalErrors
    }
};