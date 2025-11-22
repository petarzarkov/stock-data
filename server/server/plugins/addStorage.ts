import { FastifyPluginAsync } from "fastify";
import { Sequelize } from "sequelize";
import fp from "fastify-plugin";

// Declaration merging
declare module "fastify" {
    export interface FastifyInstance {
        sq: Sequelize | undefined;
    }
    export interface FastifyRequest {
        sq: Sequelize | undefined;
    }
}

const addStorage: FastifyPluginAsync<{ sq?: Sequelize }> = async (
    fastify,
    options
) => {
    fastify.decorate("sq", options.sq);

    fastify.addHook("preHandler", (request, _reply, next) => {
        request.sq = options.sq;

        next();
    });
};

export const addStoragePlugin = fp(addStorage);