import { FastifyReply, FastifyRequest } from "fastify";
import { RouteGenericInterface } from "fastify/types/route";
import { Server, IncomingMessage, ServerResponse } from "http";
import { withError } from "@contracts/APIResults";

export const delById = async (
  req: FastifyRequest<{ Params: { id: string } }, Server, IncomingMessage, unknown>,
  reply: FastifyReply<Server, IncomingMessage, ServerResponse, RouteGenericInterface, unknown>
) => {
  const { id } = req.params || {};
  const delById = await req.repo?.delById({
    requestId: req.id,
    id
  });

  if (!delById?.isSuccess) {
    reply.status(500);
    return withError("Oops, something happened.");
  }

  if (!delById.result) {
    reply.status(404);
    return withError("Sorry, nothing found for the given id.");
  }

  return delById;
};