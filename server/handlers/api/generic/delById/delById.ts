import { FastifyReply, FastifyRequest } from "fastify";
import { RouteGenericInterface } from "fastify/types/route";
import { Server, IncomingMessage, ServerResponse } from "http";
import { fail } from "hot-utils";

export const delById = async (
    req: FastifyRequest<{ Params: { id: string } }, Server, IncomingMessage>,
    reply: FastifyReply<Server, IncomingMessage, ServerResponse, RouteGenericInterface, unknown>
) => {
    const { id } = req.params || {};
    const delById = await req.repo?.delById({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        requestId: req.id,
        id
    });

    if (!delById?.isOk) {
        reply.status(500);
        return fail("Oops, something happened.");
    }

    if (!delById.result) {
        reply.status(404);
        return fail("Sorry, nothing found for the given id.");
    }

    return delById;
};