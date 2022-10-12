import { FastifyReply, FastifyRequest } from "fastify";
import { RouteGenericInterface } from "fastify/types/route";
import { Server, IncomingMessage, ServerResponse } from "http";
import { withError } from "@contracts/APIResults";
import { StockAttributes, StockTypesAttributes } from "@db/models";

export const bulkCreate = async (
    req: FastifyRequest<{ Body: StockAttributes[] | StockTypesAttributes[] }, Server, IncomingMessage>,
    reply: FastifyReply<Server, IncomingMessage, ServerResponse, RouteGenericInterface, unknown>
) => {
    const bulkCreate = await req.repo?.createBulk({
    // It's really a union type, not an intersection, but TS inference sucks here
        dtos: req.body
    });

    if (!bulkCreate?.isOk) {
        reply.status(500);
        return withError("Oops, something happened.");
    }

    if (!bulkCreate.result?.length) {
        reply.status(404);
        return withError("Sorry, nothing created for the given items.");
    }

    return bulkCreate;
};