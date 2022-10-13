import { FastifyReply, FastifyRequest } from "fastify";
import { RouteGenericInterface } from "fastify/types/route";
import { fail } from "hot-utils";
import { Server, IncomingMessage, ServerResponse } from "http";

export const stocks = async (
    req: FastifyRequest<{ Querystring: { amount?: number; languageId?: number; categoryId?: number } }, Server, IncomingMessage>,
    reply: FastifyReply<Server, IncomingMessage, ServerResponse, RouteGenericInterface>
) => {
    // const { amount, languageId, categoryId } = req.query || {};

    const stocks = await req.repo?.getAll({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        requestId: req.id
    });

    if (!stocks?.isOk) {
        reply.status(500);
        return fail("Oops, something happened.");
    }

    if (!stocks?.result) {
        reply.status(404);
        return fail("Sorry, nothing found for the given query.");
    }

    return stocks;
};