import { MAX_QUESTIONS, MIN_QUESTIONS } from "@app/constants";
import { generalErrors } from "@app/server/swagger/generalErrors";
import { FastifySchema } from "fastify";

export const questionSchema = {
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

export const questionsSchema: FastifySchema & Record<string, unknown> = {
  description: "Get questions",
  tags: ["question"],
  summary: "Questions",
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
            type: questionSchema.type,
            required: questionSchema.required,
            properties: {
              ...questionSchema.properties,
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