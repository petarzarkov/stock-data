import { getItemSchemaPerType } from "@server/handlers";
import { generalErrors } from "@server/server/swagger/generalErrors";
import { FastifySchema } from "fastify";

export const getRandomSchema = (type: string, tag?: string): FastifySchema & Record<string, unknown> => {
    const schema = getItemSchemaPerType(type);

    return {
        description: `Get random ${type}`,
        tags: [tag || type],
        summary: `Get random ${type}`,
        response: {
            "2xx": {
                description: "Successful response",
                type: "object",
                properties: {
                    isOk: { type: "boolean" },
                    result: {
                        type: "array",
                        items: schema
                    },
                }
            },
            ...generalErrors
        }
    };
};