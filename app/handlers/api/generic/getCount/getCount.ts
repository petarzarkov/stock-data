import { FastifyReply, FastifyRequest } from "fastify";
import { RouteGenericInterface } from "fastify/types/route";
import { Server, IncomingMessage, ServerResponse } from "http";
import { withError } from "@contracts/APIResults";

export const getCount = async (
  req: FastifyRequest<RouteGenericInterface, Server, IncomingMessage, unknown>,
  reply: FastifyReply<Server, IncomingMessage, ServerResponse, RouteGenericInterface, unknown>
) => {
  const count = await (req.cache || req.repo)?.count({
    requestId: req.id
  });

  if (!count?.isSuccess) {
    reply.status(500);
    return withError("Oops, something happened.");
  }

  if (!count.result && count.result !== 0) {
    reply.status(404);
    return withError("Sorry, nothing found.");
  }

  return count;
};