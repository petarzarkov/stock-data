import { STOCKS_FROM, STOCKS_TO } from "@server/constants";
import { generalErrors } from "@server/server/swagger/generalErrors";
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
        required: ["from", "to", "balance"],
        properties: {
            from: { type: "number", minimum: STOCKS_FROM },
            to: { type: "number", maximum: STOCKS_TO },
            balance: { type: "number" }
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
                        from: { type: "string" },
                        to: { type: "string" },
                        affordableAmount: { type: "number" },
                        costPerUnit: { type: "number" },
                        profitPerUnit: { type: "number" },
                        totalCost: { type: "number" },
                        totalProfit: { type: "number" },
                        totalSalesInPeriod: { type: "number" },
                        sales: {
                            type: "array",
                            items: stockSchema
                        }
                    }
                },
            }
        },
        ...generalErrors
    }
};