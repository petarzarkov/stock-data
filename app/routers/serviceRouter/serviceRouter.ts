import { feeds, healthcheck, upcheck } from "@app/handlers";
import { checkHeader } from "@app/server/plugins";
import { FastifyInstance, FastifyPluginOptions } from "fastify";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const serviceRouter = (app: FastifyInstance, _options: FastifyPluginOptions, next: (err?: Error | undefined) => void) => {

    app.get("/upcheck", {
        schema: {
            description: "Is service up",
            tags: ["Service"]
        }
    }, upcheck);

    app.get("/healthcheck", {
        schema: {
            description: "Is service healthy",
            tags: ["Service"]
        },
        preHandler: checkHeader,
        handler: healthcheck
    });

    app.post("/feeds", {
        schema: {
            description: "Start/Run stocks feeders (Needs to be developed)",
            tags: ["Service"],
            body: {
                type: "object",
                required: ["action"],
                properties: {
                    action: { type: "string", enum: ["start", "stop"] },
                }
            },
            security: [
                {
                    "apitoken": []
                }
            ]
        },
        preHandler: checkHeader,
        handler: feeds
    });

    next();
};

