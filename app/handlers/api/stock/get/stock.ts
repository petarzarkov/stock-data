import { FastifyReply, FastifyRequest } from "fastify";
import { StocksRepo } from "@db/repositories";
import { RouteGenericInterface } from "fastify/types/route";
import { Server, IncomingMessage, ServerResponse } from "http";
import { withError } from "@contracts/APIResults";

export const stocks = async (
    req: FastifyRequest<{ Querystring: { amount?: number; languageId?: number; categoryId?: number } }, Server, IncomingMessage>,
    reply: FastifyReply<Server, IncomingMessage, ServerResponse, RouteGenericInterface>
) => {
    // const { amount, languageId, categoryId } = req.query || {};

    const stocks = await StocksRepo.getAll({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        requestId: req.id
    });

    if (!stocks.isOk) {
        reply.status(500);
        return withError("Oops, something happened.");
    }

    if (!stocks.result) {
        reply.status(404);
        return withError("Sorry, nothing found for the given query.");
    }

    return stocks;
};