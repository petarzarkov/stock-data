import { API_TOKEN } from "@app/constants";
import { FastifyPluginAsync, FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import fp from "fastify-plugin";
import { RouteGenericInterface } from "fastify/types/route";
import { Server, IncomingMessage, ServerResponse } from "http";

export const checkHeader = (
    request: FastifyRequest<RouteGenericInterface, Server, IncomingMessage, unknown>,
    reply: FastifyReply<Server, IncomingMessage, ServerResponse, RouteGenericInterface, unknown>,
    next: HookHandlerDoneFunction
) => {
    const { apitoken } = request.headers;
    if (apitoken !== API_TOKEN) {
        reply.status(401);
        next(new Error("Unauthorized request."));
    }

    next();
};

const addAuth: FastifyPluginAsync = async (
    fastify
) => {
    fastify.addHook("preHandler", checkHeader);
};

export const addAuthPlugin = fp(addAuth);