import { APP_VERSION } from "@server/constants";
import { FastifyReply, FastifyRequest } from "fastify";
import { RouteGenericInterface } from "fastify/types/route";
import { ok } from "hot-utils";
import { Server, IncomingMessage, ServerResponse } from "http";

export const upcheck = async (
    _req: FastifyRequest<RouteGenericInterface, Server, IncomingMessage>,
    reply: FastifyReply<Server, IncomingMessage, ServerResponse, RouteGenericInterface, unknown>
) => {
    reply.status(200);
    return ok({
        version: APP_VERSION,
        up: true
    });
};