import { FastifyReply, FastifyRequest } from "fastify";
import { RouteGenericInterface } from "fastify/types/route";
import { Server, IncomingMessage, ServerResponse } from "http";
import { withError } from "@contracts/APIResults";

export const bulkDelete = async (
  req: FastifyRequest<{ Body: string[] }, Server, IncomingMessage, unknown>,
  reply: FastifyReply<Server, IncomingMessage, ServerResponse, RouteGenericInterface, unknown>
) => {
  const bulkDelete = await req.repo?.delByIds({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ids: req.body
  });

  if (!bulkDelete?.isSuccess) {
    reply.status(500);
    return withError("Oops, something happened.");
  }

  if (!bulkDelete.result) {
    reply.status(404);
    return withError("Sorry, nothing deleted for the given ids.");
  }

  return bulkDelete;
};