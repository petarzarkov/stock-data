import { FastifyReply, FastifyRequest } from "fastify";
import { RouteGenericInterface } from "fastify/types/route";
import { Server, IncomingMessage, ServerResponse } from "http";

export const getCount = async (
    req: FastifyRequest<RouteGenericInterface, Server, IncomingMessage>,
    reply: FastifyReply<Server, IncomingMessage, ServerResponse, RouteGenericInterface, unknown>
) => {
    const count = await req.repo?.count({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        requestId: req.id
    });

    if (!count?.isOk) {
        reply.status(500);
        return fail("Oops, something happened.");
    }

    if (!count.result && count.result !== 0) {
        reply.status(404);
        return fail("Sorry, nothing found.");
    }

    return count;
};