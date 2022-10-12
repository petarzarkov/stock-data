import { MAX_QUESTIONS, MIN_QUESTIONS } from "@app/constants";
import { generalErrors } from "@app/server/swagger/generalErrors";
import { FastifySchema } from "fastify";

export const stockSchema = {
    type: "object",
    required: ["id", "categoryId", "languageId", "difficulty", "question", "correctAnswer", "incorrectAnswers"],
    properties: {
        id: { type: "string", format: "uuid" },
        categoryId: { type: "string", format: "uuid" },
        languageId: { type: "string", format: "uuid" },
        difficulty: { type: "string" },
        question: { type: "string" },
        correctAnswer: { type: "string" },
        incorrectAnswers: { type: "array", items: { type: "string" }, minItems: 1, maxItems: 6 },
    }
};

export const stocksSchema: FastifySchema & Record<string, unknown> = {
    description: "Get stocks",
    tags: ["stock"],
    summary: "Stocks",
    querystring: {
        type: "object",
        additionalProperties: false,
        properties: {
            amount: { type: "number", minimum: MIN_QUESTIONS, maximum: MAX_QUESTIONS },
            languageId: { type: "number" },
            categoryId: { type: "number" },
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
                    nullable: true,
                    items: {
                        type: stockSchema.type,
                        required: stockSchema.required,
                        properties: {
                            ...stockSchema.properties,
                            lang: { type: "string" },
                            category: { type: "string" },
                        }
                    }
                },
            }
        },
        ...generalErrors
    }
};