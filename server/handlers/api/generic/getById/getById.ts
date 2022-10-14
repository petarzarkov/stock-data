import { FastifyReply, FastifyRequest } from "fastify";
import { RouteGenericInterface } from "fastify/types/route";
import { fail } from "hot-utils";
import { Server, IncomingMessage, ServerResponse } from "http";

export const getById = async (
    req: FastifyRequest<{ Params: { id: string } }, Server, IncomingMessage>,
    reply: FastifyReply<Server, IncomingMessage, ServerResponse, RouteGenericInterface, unknown>
) => {
    const { id } = req.params || {};
    const findById = await req.repo?.getById({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        requestId: req.id,
        id
    });

    if (!findById?.isOk) {
        reply.status(500);
        return fail("Oops, something happened.");
    }

    if (!findById.result) {
        reply.status(404);
        return fail("Sorry, nothing found for the given id.");
    }

    return findById;
};