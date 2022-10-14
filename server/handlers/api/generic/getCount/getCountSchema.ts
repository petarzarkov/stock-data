import { generalErrors } from "@server/server/swagger/generalErrors";
import { FastifySchema } from "fastify";

export const getCountSchema = (type: string): FastifySchema & Record<string, unknown> => ({
    description: `Get ${type} count`,
    tags: [type],
    summary: `Get ${type} count`,
    response: {
        "2xx": {
            description: "Successful response",
            type: "object",
            properties: {
                isOk: { type: "boolean" },
                result: { type: "number" },
            }
        },
        ...generalErrors
    }
});