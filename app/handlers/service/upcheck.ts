import { APP_VERSION } from "@app/constants";
import { FastifyReply, FastifyRequest } from "fastify";
import { RouteGenericInterface } from "fastify/types/route";
import { Server, IncomingMessage, ServerResponse } from "http";

export const upcheck = async (
  _req: FastifyRequest<RouteGenericInterface, Server, IncomingMessage, unknown>,
  reply: FastifyReply<Server, IncomingMessage, ServerResponse, RouteGenericInterface, unknown>
) => {
  reply.status(200);
  return {
    version: APP_VERSION,
    up: true
  };
};