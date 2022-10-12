import { fastify } from "fastify";
import fcors from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import { Sequelize } from "sequelize";
import { HotLogger } from "hot-utils";
import { apiRouter, apiRouterAuth, serviceRouter } from "@app/routers";
import { addStoragePlugin, addLoggerPlugin } from "./plugins";
import { swagDocs } from "./swagger";
import { isProd, SERVER_PORT } from "@app/constants";
import { v4 } from "uuid";
import Ajv from "ajv";

export const startServer = async (logger: HotLogger, sq?: Sequelize) => {
    const app = fastify({
        logger: false,
        requestIdLogLabel: "requestId",
        genReqId: () => v4()
    });

    app.setValidatorCompiler(({ schema, httpPart }) => {
        const defaultSchema = new Ajv({
            removeAdditional: true,
            useDefaults: true,
            coerceTypes: false,
            nullable: true
        });
        const querySchema = new Ajv({
            removeAdditional: true,
            useDefaults: true,
            coerceTypes: true,
            nullable: true
        });

        return httpPart === "querystring" ? querySchema.compile(schema) : defaultSchema.compile(schema);
    });

    app.register(fcors);
    app.register(addLoggerPlugin, { logger });
    app.register(fastifySwagger, swagDocs);
    app.register(addStoragePlugin, { sq });
    app.register(apiRouter, { prefix: "api" });
    app.register(apiRouterAuth, { prefix: "api" });
    app.register(serviceRouter, { prefix: "service" });

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
