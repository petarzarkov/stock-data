import { FastifyReply, FastifyRequest } from "fastify";
import { RouteGenericInterface } from "fastify/types/route";
import { fail } from "hot-utils";
import { Server, IncomingMessage, ServerResponse } from "http";

export const bulkDelete = async (
    req: FastifyRequest<{ Body: string[] }, Server, IncomingMessage>,
    reply: FastifyReply<Server, IncomingMessage, ServerResponse, RouteGenericInterface, unknown>
) => {
    const bulkDelete = await req.repo?.delByIds({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ids: req.body
    });

    if (!bulkDelete?.isOk) {
        reply.status(500);
        return fail("Oops, something happened.");
    }

    if (!bulkDelete.result) {
        reply.status(404);
        return fail("Sorry, nothing deleted for the given ids.");
    }

    return bulkDelete;
};