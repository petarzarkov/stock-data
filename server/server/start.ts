import { fastify } from "fastify";
import fcors from "@fastify/cors";
import fstatic from "@fastify/static";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { Sequelize } from "sequelize";
import { HotLogger } from "hot-utils";
import { apiRouter, apiRouterAuth, serviceRouter } from "@server/routers";
import { addStoragePlugin, addLoggerPlugin } from "./plugins";
import { swagDocs, swagUi } from "./swagger";
import { isProd, SERVER_PORT } from "@server/constants";
import { v4 } from "uuid";
import path from "path";
import Ajv from "ajv";
import addFormats from "ajv-formats";

export const startServer = async (logger: HotLogger, sq?: Sequelize) => {
    const app = fastify({
        logger: false,
        requestIdLogLabel: "requestId",
        genReqId: () => v4()
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    app.setValidatorCompiler(({ schema, httpPart }) => {
        const defaultSchema = new Ajv({
            removeAdditional: true,
            useDefaults: true,
            coerceTypes: false
        });
        const querySchema = new Ajv({
            removeAdditional: true,
            useDefaults: true,
            coerceTypes: true
        });

        addFormats(defaultSchema);
        addFormats(querySchema);
        return httpPart === "querystring" ? querySchema.compile(schema) : defaultSchema.compile(schema);
    });

    app.register(fcors);
    app.register(addLoggerPlugin, { logger });
    app.register(fastifySwagger, swagDocs);
    app.register(fastifySwaggerUi, swagUi);
    app.register(addStoragePlugin, { sq });
    app.register(apiRouter, { prefix: "api" });
    app.register(apiRouterAuth, { prefix: "api" });
    app.register(serviceRouter, { prefix: "service" });
    app.register(fstatic, {
        root: path.join(__dirname, "..", "..", "..", "client", "dist")
    });

    app.ready(err => {
        if (err) {
            app.logger.error("Error on app ready", { err });
        }

        app.swagger();
    });

    try {
        app.listen({
            port: SERVER_PORT,
            host: "0.0.0.0"
        }, (_, address) => {
            app.logger.info(`Service started ${isProd ? address : `http://localhost:${SERVER_PORT}`}`, { port: SERVER_PORT });
        });
    } catch (err) {
        app.logger.error("Error starting server", { err: <Error>err, port: SERVER_PORT });
        process.exit(1);
    }

    return app;
};
