import { getItemSchemaPerType } from "@server/handlers";
import { generalErrors } from "@server/server/swagger/generalErrors";
import { FastifySchema } from "fastify";

export const getAllSchema = (type: string, tag?: string): FastifySchema & Record<string, unknown> => {
    const schema = getItemSchemaPerType(type);

    return {
        description: `Get all ${type}`,
        tags: [tag || type],
        summary: `Get all ${type}`,
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