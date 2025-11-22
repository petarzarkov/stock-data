import { getItemSchemaPerType } from "@server/handlers";
import { generalErrors } from "@server/server/swagger/generalErrors";
import { FastifySchema } from "fastify";

export const bulkCreateSchema = (type: string, tag?: string): FastifySchema & Record<string, unknown> => {
    const schema = getItemSchemaPerType(type);
    const [, ...required] = schema?.required || [];

    return {
        description: `Bulk create/edit ${type}`,
        tags: [tag || type],
        summary: `Bulk create/edit ${type}`,
        body: {
            type: "array",
            items: {
                type: schema?.type,
                required,
                properties: schema?.properties
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
                        items: schema
                    },
                }
            },
            ...generalErrors
        },
        security: [
            {
                "apitoken": []
            }
        ]
    };
};