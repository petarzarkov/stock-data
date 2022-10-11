import { APP_VERSION } from "@app/constants";
import { FastifyReply, FastifyRequest } from "fastify";
import { RouteGenericInterface } from "fastify/types/route";
import { Server, IncomingMessage, ServerResponse } from "http";

export const healthcheck = async (
  req: FastifyRequest<RouteGenericInterface, Server, IncomingMessage, unknown>,
  reply: FastifyReply<Server, IncomingMessage, ServerResponse, RouteGenericInterface, unknown>
) => {
  try {
    await req.sq?.authenticate();
    const pong = await req.redis?.ping();

    return {
      version: APP_VERSION,
      dbHealthy: true,
      redisHealthy: pong === "PONG"
    };
  } catch (error) {
    reply.status(500);
    req.logger.error("Error on healthcheck", { err: <Error>error });

    return {
      healthy: false
    };
  }
};