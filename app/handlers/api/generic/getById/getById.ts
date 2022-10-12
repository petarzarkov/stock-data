import { FastifyReply, FastifyRequest } from "fastify";
import { RouteGenericInterface } from "fastify/types/route";
import { Server, IncomingMessage, ServerResponse } from "http";
import { withError } from "@contracts/APIResults";

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
        return withError("Oops, something happened.");
    }

    if (!findById.result) {
        reply.status(404);
        return withError("Sorry, nothing found for the given id.");
    }

    return findById;
};